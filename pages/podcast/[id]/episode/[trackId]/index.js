import Layout from "../../../../../components/Layout"
import { useRouter } from 'next/router'
import EpisodeDetail from "../../../../../components/EpisodeDetail"




export default function Episode (){
  const router = useRouter()
  const { id, trackId }= router.query

  return (
    <Layout>
      <EpisodeDetail id={id} trackId={trackId}/>
    </Layout>
  )
}