import '../styles/App.sass';
import { useEffect, useState } from 'react';
import getPodcast from '../services/api';
import localStorage from '../services/localStorage'
import List from './List';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const localSotorageDate = localStorage.get('date','');
  const [userDate, setUserDate] = useState(localSotorageDate)

  useEffect(() => {
    const today = new Date().toLocaleDateString()
    if(today !== localSotorageDate){
      setUserDate(today)
      localStorage.remove('date')
      localStorage.set('date', userDate)
    } else{
      const data = localStorage.get('podcastData','')
      setData(data)
    }
  },[]);

  useEffect(() => {
    getPodcast().then(response => {
        setData(response)
        
        localStorage.remove('podcastData')
        localStorage.set('podcastData', response)
    })
  }, [userDate]);



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
          <span className='searcher__results flex_column_center'>{podcastFiltered.length}</span>
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