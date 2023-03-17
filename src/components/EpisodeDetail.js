import PodcastCard from './PodcastCard';
import localStorage from '../services/localStorage';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const EpisodeDetail = () =>{
  const podcast = localStorage.get('podcastSelected')
  const {episodeId, podcastId} = useParams()
  const [episode, setEpisode] = useState({})

  useEffect(() => {
    const episode0 = localStorage.get(`podcast_${podcastId}`).filter(x => x.trackId === parseInt(episodeId) )
    setEpisode(episode0[0])
},[])

  return(
    <div className='podcastDetail__container'>
    <PodcastCard podcast={podcast}/>
  <section className='podcast'>
    <h2>{episode.trackName}</h2>
    <p>{episode.description}</p>
    <audio className='audio__controls' src={episode.episodeUrl} controls></audio>
  </section>
  </div>
  )
}
export default EpisodeDetail