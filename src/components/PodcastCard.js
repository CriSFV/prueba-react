
const PodcastCard = (props) => {
  return(
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

  )
}

export default PodcastCard