import '../styles/PodcastDetail.sass';
import { Link, useParams } from 'react-router-dom';
import localStorage from '../services/localStorage'
import PodcastCard from './PodcastCard';
import { useEffect, useState } from 'react';
import getApiInfo from '../services/api';

const PodcastDetail = () =>{
  const {podcastId} = useParams();
  const [podcastToRender, setPodcastSelected] = useState([]);
  // const [podcastLs, setPodcastLs] = useState();
  const podcast = localStorage.get('podcastSelected')
  useEffect(() => {
    // setPodcastLs(podcast)
      // setIsLoading(true)
      console.log(podcast)
      const podcastDetailLs= localStorage.get(`podcast_${podcast.id}`, null)
      if(podcastDetailLs === null){
        console.log('podcast no guardado en ls');
        getApiInfo.getPodcastInfo(podcast.id).then(resp => {
          setPodcastSelected(resp)
          localStorage.set(`podcast_${podcast.id}`,resp)
          // setIsLoading(false)
        })
      }else{
        setPodcastSelected(podcastDetailLs)
        // setIsLoading(false)
      }

  },[])

  const convertTime = (seconds)=>{
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }

  const printTable = ()=>{
    //const track = podcastToRender.find(epi=>epi.wrapperType === 'track')
      return (
        podcastToRender.map((episode)=>{
          if(episode.wrapperType==='podcastEpisode'){
            const episodeDate = new Date (episode.releaseDate)
            const time = episode.trackTimeMillis / 1000
            return(
                  <tr key={episode.trackId} id={episode.trackId}>
                    <td><Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>{episode.trackName}</Link></td>
                    <td>{episodeDate.toLocaleDateString()}</td>
                    <td>{convertTime(time)}</td>
                  </tr>
                )
            }
            return console.log('')
          })
      )
  }

  return(
    <div className='podcastDetail__container'>
      <PodcastCard podcast={podcast}/>
    <section>
      <h2 className='box-shadow detail__episodes'>Episodes:  </h2>
      <table className='box-shadow detail__table'>
        <thead>
          <tr>
            <th><b>Title</b></th>
            <th><b>Date</b></th>
            <th><b>Duration</b></th>
          </tr>
        </thead>
        <tbody>{printTable()}</tbody>
      </table>

    </section>
    </div>
  )
}
export default PodcastDetail