import '../styles/App.sass';
import { useEffect, useState } from 'react';
import getApiInfo from '../services/api';
import localStorage from '../services/localStorage'
import Home from './Home';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [podcastSelected, setPodcastSelected] = useState('')
  
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
      getApiInfo.getPodcasts().then(response => {
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

  useEffect(() => {
    console.log('cambia podcastSelected', podcastSelected)
  },[podcastSelected])

  const handleSearch = (ev) =>{
    setUserSearch(ev)
  };
  const handleUserSelect = (ev) =>{
    console.log('recibo',ev)
    setPodcastSelected(ev)
  };
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())|| podcast.author.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

  return (
    <div className='ppal_container'>
      <header>
        <nav>
          <Link to='/' className="title">Podcaster</Link>
        </nav>
        <hr className='separator'/>
      </header>
      <Routes>
        <Route path='/' element={<Home data={podcastFiltered} handleSearch={handleSearch} handleUserSelect={handleUserSelect}/>}/>
        <Route path='/podcast/:id'/>
      </Routes>
      <main>
        {/* <span className='searcher__results flex_column_center'>{podcastFiltered.length}</span>
        <label>
          <input className='searcher__input' type="text" placeholder="Filter podcast" onKeyUp={handleSearch}/>
        </label> */}
        {/* <section className="searcher">
        </section> */}
        {/* <List data={podcastFiltered} handleSearch={handleSearch}/> */}
      </main>
    </div>
  );
}

export default App;