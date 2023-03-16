import '../styles/App.sass';
import { useEffect, useState } from 'react';
import getPodcast from '../services/api';
import localStorage from '../services/localStorage'
import List from './List';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  
  useEffect(() => {
    const today = new Date()
    const todayMilliseconds = today.getTime()
    const localStorageDate = localStorage.get('date','');
    const millisecodsDay = 86400000
    const elapsedTime = todayMilliseconds - +localStorageDate
    console.log(elapsedTime)
    console.log(elapsedTime >= millisecodsDay)
    if(elapsedTime >= millisecodsDay){
      console.log('ha pasado más de un día');
      getPodcast().then(response => {
        setData(response)        
        localStorage.remove('date')
        localStorage.set('date', todayMilliseconds)
        localStorage.remove('podcastData')
        localStorage.set('podcastData', response)
      })
    } else{
      console.log('no ha pasado más de un día');
      setData(localStorage.get('podcastData',[]))
    }
  },[]);

  const handleSearch = (ev) =>{
    setUserSearch(ev.currentTarget.value)
  }
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())|| podcast.author.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

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