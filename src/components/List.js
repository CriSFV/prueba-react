import '../styles/List.sass';

const List = (props) => {
  const printList = () =>{
    return props.data.map((podcast)=>{
      return(
        <li key={podcast.id} className='list__podcast'>
          <img className='list__podcast__img' src={podcast.img} alt={`imagen ${podcast.title}`} />
          <div className='list__podcast__text flex_column_space'>
            <h6 className='text--center list__podcast__text__title'>{podcast.title}</h6>
            <span className='text--center list__podcast__text__author'>Author: {podcast.author}</span>
          </div>
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
export default List