import '../styles/App.sass';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import getApiInfo from '../services/api';
import localStorage from '../services/localStorage'
import Home from './Home';
import Loader from './Loader';
import PodcastDetail from './PodcastDetail';
import EpisodeDetail from './EpisodeDetail';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [podcast, setPodcast] = useState(''); // podcast seleccionado por el usuario
  // const [podcastSelected, setPodcastSelected] = useState([]); // detalle de podcast
  const [isLoading, setIsLoading] = useState(false);

  
  // useEffect(() => {
  //   if(podcast){
  //     setIsLoading(true)
  //     const podcastDetailLs= localStorage.get(`podcast_${podcast.id}`, null)
  //     if(podcastDetailLs === null){
  //       console.log('podcast no guardado en ls');
  //       getApiInfo.getPodcastInfo(podcast.id).then(resp => {
  //         setPodcastSelected(resp)
  //         localStorage.set(`podcast_${podcast.id}`,resp)
  //         setIsLoading(false)
  //       })
  //     }else{
  //       setPodcastSelected(podcastDetailLs)
  //       setIsLoading(false)
  //     }

  //   }
  // },[podcast])

  useEffect(() => {
    // Compruebo si ha pasado más de un día, para hacer petición o coger los datos del localStorage
    const today = new Date()
    const todayMilliseconds = today.getTime()
    const localStorageDate = localStorage.get('date','');
    const millisecodsDay = 86400000
    const elapsedTime = todayMilliseconds - +localStorageDate
    console.log('ha pasado más de un día?:',elapsedTime >= millisecodsDay);
    if(elapsedTime >= millisecodsDay){
      console.log('Nueva petición');
      setIsLoading(true)
      getApiInfo.getPodcasts().then(response => {
        setIsLoading(false)
        setData(response)  
        localStorage.clear()  
        localStorage.set('date', todayMilliseconds)
        localStorage.set('podcastData', response)
      })
    } else{
      setIsLoading(false)
      console.log('Get info localStorage');
      setData(localStorage.get('podcastData',[]))
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
    localStorage.set('podcastSelected', podcast)
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