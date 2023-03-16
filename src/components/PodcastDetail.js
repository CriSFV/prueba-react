import '../styles/PodcastDetail.sass';
import PodcastCard from './PodcastCard';
import { Link } from 'react-router-dom';

const PodcastDetail = (props) =>{
  console.log(props);
  
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
    props.episodes.shift()
    return props.episodes.map((episode)=>{
      const episodeDate = new Date (episode.releaseDate)
      const time = episode.trackTimeMillis / 1000
      return(
          <tr key={episode.trackId} id={episode.trackId}>
            <td><Link to={`/podcast/episode/${episode.trackId}`}>{episode.trackName} </Link></td>
            <td> {episodeDate.toLocaleDateString()} </td>
            <td> {convertTime(time)} </td>
          </tr>
      )
    })
  }

  return(
    <div className='podcastDetail__container'>
      <PodcastCard podcast={props.podcast}/>
    <section>
      <h2 className='box-shadow detail__episodes'>Episodes: {props.episodes.length ? props.episodes.length-1:0} </h2>
      <table className='box-shadow detail__table'>
        <thead>
          <tr>
            <th><b>Title</b></th>
            <th><b>Date</b></th>
            <th><b>Duration</b></th>
          </tr>
        </thead>
        <tbody>{props.episodes.length ? printTable(): ''}</tbody>
      </table>

    </section>
    </div>
  )
}
export default PodcastDetail