import '../styles/App.sass';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import getApiInfo from '../services/api';
import localStorage from '../services/localStorage'
import Home from './Home';
import Loader from './Loader';
import PodcastDetail from './PodcastDetail';
// import EpisodeDetail from './EpisodeDetail';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [podcast, setPodcast] = useState('');
  const [podcastSelected, setPodcastSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if(podcast){

      getApiInfo.getPodcastInfo(podcast.id).then(resp => {
        setPodcastSelected(resp)
      })

    }
  },[podcast])

  useEffect(() => {
    const today = new Date()
    const todayMilliseconds = today.getTime()
    const localStorageDate = localStorage.get('date','');
    const millisecodsDay = 86400000
    const elapsedTime = todayMilliseconds - +localStorageDate
    if(elapsedTime >= millisecodsDay){
      console.log('ha pasado más de un día');
      setIsLoading(true)
      getApiInfo.getPodcasts().then(response => {
        setIsLoading(false)
        setData(response)        
        localStorage.remove('date')
        localStorage.set('date', todayMilliseconds)
        localStorage.remove('podcastData')
        localStorage.set('podcastData', response)
      })
    } else{
      setIsLoading(false)
      console.log('no ha pasado más de un día');
      setData(localStorage.get('podcastData',[]))
    }
  },[]);


  const handleSearch = (ev) =>{
    setUserSearch(ev)
  };
  const handleUserSelect = (ev) =>{
    console.log('recibo',ev)
    const podcast = data.find(pod => pod.id === ev)
    localStorage.set(`podcast_${podcast.id}`,podcast)
    setPodcast(podcast)
  };
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())|| podcast.author.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

  const Loading = () =>{
    console.log('entro a loading');
    if(isLoading){
      console.log('entro a loading true');
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
        <Route path='/podcast/:id' element={<PodcastDetail episodes={podcastSelected} podcast={podcast}/>}  />
          
      </Routes>
    </div>
  );
}

export default App;