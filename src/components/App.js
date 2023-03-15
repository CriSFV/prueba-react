import '../styles/App.sass';
import { useEffect, useState } from 'react';
import GetPodcast from '../services/api';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    GetPodcast().then(response => {
        console.log('desde app', response)
        setData(response)
    })
  }, []);



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
      </main>
    </div>
  );
}

export default App;