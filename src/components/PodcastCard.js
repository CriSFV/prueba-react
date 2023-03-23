import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const PodcastCard = (props) => {
  return(
    <section className='podcast'>
      <div className="podcast__img"><Link to={`/podcast/${props.podcast.id}`}><img src={props.podcast.img} alt={`imagen_ ${props.podcast.title}`} /></Link></div>
      <hr />
      <div className="podcast__text">
        <h4 className='podcast__title'><Link to={`/podcast/${props.podcast.id}`}>{props.podcast.title}</Link></h4>
        <span className='podcast__author'><i> by {props.podcast.author} </i></span>
      </div>
      <hr />
      <div className="podcast__text">
        <h4><b>Description:</b></h4>
        <span><i> {props.podcast.summary} </i></span>
      </div>
    </section>

  )
}
PodcastCard.propTypes = {
  podcast: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default PodcastCard