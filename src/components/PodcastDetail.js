import '../styles/PodcastDetail.sass';

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
        <tr key={episode.trackId}> 
          <td>{episode.trackName} </td>
          <td> {episodeDate.toLocaleDateString()} </td>
          <td> {convertTime(time)} </td>
        </tr>
      )
    })
  }

  return(
    <div className='podcastDetail__container'>
    <section className='podcast'>
      <div className="podcast__img"><img src={props.podcast.img} alt={`imagen_ ${props.podcast.title}`} /></div>
      <hr />
      <div className="podcast__text">
        <h4 className='podcast__title'>{props.podcast.title}</h4>
        <span className='podcast__author'><i> by {props.podcast.author} </i></span>
      </div>
      <hr />
      <div className="podcast__text">
        <h4><b>Description:</b></h4>
        <span><i> {props.podcast.summary} </i></span>
      </div>
    </section>
    <section>
      <h2 className='box-shadow detail__episodes'>Episodes: {props.episodes.length ? props.episodes.length-1:0} </h2>
      <table className='box-shadow detail__table'>
        <tr>
          <th><b>Title</b></th>
          <th><b>Date</b></th>
          <th><b>Duration</b></th>
        </tr>
        {props.episodes.length ? printTable(): ''}
      </table>

    </section>
    </div>
  )
}
export default PodcastDetail