import Layout from "../../../components/Layout"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import cache from '../../../src/services/cache'
import PodcastDetail from "../../../components/PodcastDetail"


export default function Podcast (){
  const router = useRouter()
  const { id }= router.query
  const [idPodcast, setIdPodcast]=useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [posdcastDetail, setPodcastDetail] = useState([])
  useEffect(()=>{
    setIdPodcast(cache.get('podcastSelected',null))
  },[id])
  const handleLoading = (ev) =>{
    setIsLoading(ev);
  }
  return (
    <Layout isLoading={isLoading} >
      <PodcastDetail idPodcast={idPodcast} handleLoading={handleLoading}/>
    </Layout>
  )
}