import Layout from "../../../components/Layout"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import cache from '../../../src/services/cache'
import PodcastDetail from "../../../components/PodcastDetail"


export default function Podcast (){
  const router = useRouter()
  const { id }= router.query
  // const [podcastSelected, setPodcastSelected]=useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(false)
    // setPodcastSelected(cache.get('podcastSelected',null))
  },[id])
  
  const handleLoading = (ev) =>{
    console.log('cambia:', ev)
    setIsLoading(ev);
  }
  console.log(isLoading);
  return (
    <Layout isLoading={isLoading} title={'Episodes | Podcast'}>
      <PodcastDetail handleLoading={handleLoading}/>
    </Layout>
  )
}