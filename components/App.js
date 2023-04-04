
import Layout from "../components/Layout";
import { useEffect, useState } from 'react';
import getApiInfo from '../src/services/api';
import cache from '../src/services/cache'
import Home from './Home';

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState(''); 
  const [podcast, setPodcast] = useState(''); // podcast user selected
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // check if more than one day has passed, if it's less than a day, get data from localStorage
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


  // recive input value
  const handleSearch = (ev) =>{
    setUserSearch(ev)
  };
  // receive podcast user selection
  const handleUserSelect = (ev) =>{
    const podcast = data.find(pod => pod.id === ev)
    cache.set('podcastSelected', podcast)
    setPodcast(podcast)
  };
  
  const podcastFiltered = userSearch===''? data : data.filter((podcast)=>podcast.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())|| podcast.author.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()))

  return (
    <Layout isLoading={isLoading}>
      <div className='ppal_container'>
        <Home data={podcastFiltered} handleSearch={handleSearch} handleUserSelect={handleUserSelect}/>
      </div>
    </Layout>
  );
}

export default App;