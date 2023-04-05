import Layout from "../../../../../components/Layout"
import { useRouter } from 'next/router'
import EpisodeDetail from "../../../../../components/EpisodeDetail"
import { useState } from "react"




export default function Episode (){
  const router = useRouter()
  const { id, trackId }= router.query
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (ev) =>{
    setIsLoading(ev);
  }
  return (
    <Layout isLoading={isLoading} title={'Episode Detail | Podcast'}>
      <EpisodeDetail id={id} trackId={trackId} handleLoading={handleLoading}/>
    </Layout>
  )
}