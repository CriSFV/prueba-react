import '../styles/App.sass';
import { useEffect, useState } from 'react';
import getPodcast from '../services/api';
import List from './List';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('')
  useEffect(() => {
    getPodcast().then(response => {
        setData(response)
    })
  }, []);
  const handleSearch = (ev) =>{
    setUserSearch(ev.currentTarget.value)
  }
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

  return (
    <div className='ppal_container'>
      <header>
        <h1 className="title">Podcaster</h1>
        <hr className='separator'/>
      </header>
      <main>
        <section className="searcher">
          <span className='searcher__results flex_column_center'>{data.length}</span>
          <label>
            <input className='searcher__input' type="text" placeholder="Filter podcast" onKeyUp={handleSearch}/>
          </label>
        </section>
        <List data={podcastFiltered}/>
      </main>
    </div>
  );
}

export default App;