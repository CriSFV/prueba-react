import '../styles/PodcastDetail.sass';
import { Link, useParams } from 'react-router-dom';
import localStorage from '../services/localStorage'
import PodcastCard from './PodcastCard';
import { useEffect, useState } from 'react';
import getApiInfo from '../services/api';


const PodcastDetail = (props) =>{
  const {podcastId} = useParams();
  const [podcastToRender, setPodcastSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const podcast = localStorage.get('podcastSelected')
  const {handleLoading} = props

  useEffect(()=>{
    handleLoading(loading) // eslint-disable-next-line
  },[loading]);

  useEffect(() => {

      setLoading(true)
      const podcastDetailLs= localStorage.get(`podcast_${podcast.id}`, null)
      if(podcastDetailLs === null){
        getApiInfo.getPodcastInfo(podcast.id).then(resp => {
          setPodcastSelected(resp)
          localStorage.set(`podcast_${podcast.id}`,resp)
          setLoading(false)
        })
      }else{
        setPodcastSelected(podcastDetailLs)
        setLoading(false)
      }

  },[podcast.id])

  const convertTime = (seconds)=>{
    let hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    let minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    let second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }

  const printTable = ()=>{
      return (
        podcastToRender.map((episode)=>{
          if(episode.wrapperType==='podcastEpisode'){
            const episodeDate = new Date (episode.releaseDate)
            const time = episode.trackTimeMillis / 1000
            return(
                  <tr key={episode.trackId} id={episode.trackId} className='table_tr'>
                    <td><Link to={`/podcast/${podcastId}/episode/${episode.trackId}`} className='list-decoration-none'>{episode.trackName}</Link></td>
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
      <h2 className='box-shadow detail__episodes'>Episodes: {podcastToRender.length ? podcastToRender.length-1 : '-'} </h2>
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