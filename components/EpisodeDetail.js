import PodcastCard from './PodcastCard';
import cache from '../src/services/cache';
import { useEffect, useState } from 'react';
import styles from '../styles/PodcastDetail.module.sass'
import { useRouter } from 'next/router';


const EpisodeDetail = (props) =>{
  const podcast = cache.get('podcastSelected')
  const [episode, setEpisode] = useState({})
  const { handleLoading} = props
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const {id, trackId}= router.query
  console.log('router', router)
  
  useEffect(() => {
    handleLoading(loading); // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    const episode0 = cache.get(`podcast_${id}`) ? cache.get(`podcast_${id}`).filter(x => x.trackId === parseInt(trackId) ) : ''
    if(cache.get(`podcast_${id}`)){
      console.log(cache.get(`podcast_${id}`)[0].trackId, parseInt(trackId));
      console.log(cache.get(`podcast_${id}`).filter(x => x.trackId === parseInt(trackId)))
    }
    setEpisode(episode0[0])
    setLoading(false)
  },[id,trackId]);

  const printDescriptionEpisode = (description) => {
    const content = {__html: description}

    return(
      <span dangerouslySetInnerHTML={content}></span>
    )
  }

  return(
    <div className={styles.podcastDetail__container}>
      <PodcastCard podcast={podcast}/>
      <section className={styles.podcast}>
        <h2>{episode ? episode.trackName : ''}</h2>
        <p>{printDescriptionEpisode(episode ? episode.description : '')}</p>
        <audio className={styles.Podcastaudio__controls} src={episode ? episode.episodeUrl:''} controls></audio>
      </section>
    </div>
  )
}
export default EpisodeDetail