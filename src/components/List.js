import '../styles/List.sass';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const List = (props) => {
  const selectPodcast = (ev) => {
    props.handleUserSelect(ev.currentTarget.id)
  };
  const printList = () =>{
    return props.data.map((podcast)=>{
      return(
        <li key={podcast.id} id={podcast.id}  onClick={selectPodcast}>
          <Link to={`/podcast/${podcast.id}`} className='list__podcast'>
            <img className='list__podcast__img' src={podcast.img} alt={`imagen_ ${podcast.title}`} />
            <div className='list__podcast__text flex_column_space'>
              <h6 className='text--center list__podcast__text__title'>{podcast.title}</h6>
              <span className='text--center list__podcast__text__author'>Author: {podcast.author}</span>
            </div>
          </Link>
        </li>
      )
    })
  }
  return(
    <section>
      <ul className='list'>{printList()}</ul>
    </section>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  handleUserSelect: PropTypes.func
}

export default List