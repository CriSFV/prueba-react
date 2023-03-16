import '../styles/Home.sass';
import List from './List';

const Home = (props) => {
  const userSearch = (ev) => {
    ev.preventDefault()
    props.handleSearch(ev.currentTarget.value)
  }
  const handleUserSelect = (ev) => {
    props.handleUserSelect(ev)
  }
  return(
    <>
    <section className="searcher">
      <span className='searcher__results flex_column_center'>{props.data.length}</span>
      <form action="">
        <label htmlFor='search'/>
          <input id='search' className='searcher__input' type="text" placeholder="Filter podcast" onKeyUp={userSearch} />
      </form>
    </section>
      <List data={props.data} handleUserSelect={handleUserSelect}/>
    </>
  )
}
export default Home;