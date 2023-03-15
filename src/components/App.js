import '../styles/App.sass';
import { useEffect, useState } from 'react';
import getPodcast from '../services/api';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPodcast().then(response => {
        console.log('desde app', response)
        setData(response)
    })
  }, []);
  const printList = () =>{
    return data.map((podcast)=>{
      return(
        <li key={podcast.id} className='list__podcast'>
          <img className='list__podcast__img' src={podcast.img} alt={`imagen ${podcast.title}`} />
          <div className='list__podcast__text'>
            <h6>{podcast.title}</h6>
            <span>Author: {podcast.author}</span>
          </div>
        </li>
      )
    })
  }


  return (
    <div className='ppal_container'>
      <header>
        <h1 className="title">Podcaster</h1>
      </header>
      <main>
        <section className="searcher">
          <span className='searcher__results'>{data.length}</span>
          <label>
            <input type="text" placeholder="Filter podcast"/>
          </label>
        </section>
        <section>
          <ul className='list'>{printList()}</ul>
        </section>
      </main>
    </div>
  );
}

export default App;