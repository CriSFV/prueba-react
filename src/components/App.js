import '../styles/App.sass';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import getApiInfo from '../services/api';
import cache from '../services/cache'
import Home from './Home';
import Loader from './Loader';
import PodcastDetail from './PodcastDetail';
import EpisodeDetail from './EpisodeDetail';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [podcast, setPodcast] = useState(''); // podcast seleccionado por el usuario
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Compruebo si ha pasado más de un día, para hacer petición o coger los datos del localStorage
    const today = new Date()
    const todayMilliseconds = today.getTime()
    const cacheDate = cache.get('date','');
    const millisecodsDay = 86400000
    const elapsedTime = todayMilliseconds - +cacheDate
    console.log('ha pasado más de un día?:',elapsedTime >= millisecodsDay);
    if(elapsedTime >= millisecodsDay){
      console.log('Nueva petición');
      setIsLoading(true)
      getApiInfo.getPodcasts().then(response => {
        setIsLoading(false)
        setData(response)  
        cache.clear()  
        cache.set('date', todayMilliseconds)
        cache.set('podcastData', response)
      })
    } else{
      setIsLoading(false)
      console.log('Get info cache');
      setData(cache.get('podcastData',[]))
    }
  },[]);
  const handleLoading = (ev) => {
    setIsLoading(ev)
  }

  const handleSearch = (ev) =>{
    setUserSearch(ev)
  };
  const handleUserSelect = (ev) =>{
    const podcast = data.find(pod => pod.id === ev)
    cache.set('podcastSelected', podcast)
    setPodcast(podcast)
  };
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())|| podcast.author.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

  const Loading = () =>{
    if(isLoading){
      return (
        <Loader/>
      )
    }
  }

  return (
    <div className='ppal_container'>
      <header>
        <div className='loader__container'>{Loading()}</div>
        <nav>
          <Link to='/' className="title">Podcaster</Link>
        </nav>
        <hr className='separator'/>
      </header>
      <Routes>
        <Route path='/' element={<Home data={podcastFiltered} handleSearch={handleSearch} handleUserSelect={handleUserSelect}/>}/>
        <Route path='/podcast/:podcastId' element={<PodcastDetail podcast={podcast} handleLoading={handleLoading}/>}  />
          <Route path='/podcast/:podcastId/episode/:episodeId' element={<EpisodeDetail/>} />
      </Routes>
    </div>
  );
}

export default App;