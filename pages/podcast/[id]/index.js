import Layout from "../../../components/Layout"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import PodcastDetail from "../../../components/PodcastDetail"
import cache from '../../../src/services/cache'

export default function Podcast (){
  const router = useRouter()
  const { id }= router.query
  // const [podcastSelected, setPodcastSelected]=useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(cache.get('podcastSelected') ? false : true)
    // setPodcastSelected(cache.get('podcastSelected',null))
  },[id])
  
  const handleLoading = (ev) =>{
    setIsLoading(ev);
  }
  return (
    <Layout isLoading={isLoading} title={'Episodes | Podcast'}>
      <PodcastDetail handleLoading={handleLoading}/>
    </Layout>
  )
}