import PodcastCard from './PodcastCard';
import cache from '../services/cache';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const EpisodeDetail = () =>{
  const podcast = cache.get('podcastSelected')
  const {episodeId, podcastId} = useParams()
  const [episode, setEpisode] = useState({})

  useEffect(() => {
    const episode0 = cache.get(`podcast_${podcastId}`).filter(x => x.trackId === parseInt(episodeId) )
    setEpisode(episode0[0])
},[podcastId,episodeId])

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