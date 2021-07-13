import League from '../components/home/League';
import {SoccerKey} from '../lib/socerApi'
import Layout from '../components/home/Layout';

export const getStaticProps = async () => {
    const nextWeek = new Date().setDate(new Date().getDate()+10)
    const res = await fetch(`https://api.football-data.org/v2/matches?dateFrom=${new Date().toISOString().substring(0,10)}&&dateTo=${new Date(nextWeek).toISOString().substring(0,10)}`,{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    if (res.status===429){
        return {
            props:{
                league:[]
            },
            revalidate:10
        }
    } else {
        const data = await res.json()
        const sorted = data.matches.sort((a,b)=>a.competition.id-b.competition.id)
        const uniqueLeagueId = [...new Set(sorted.map(item => item.competition.id))];
        const filteredLeague = uniqueLeagueId.map(item=>sorted.filter(isi=>isi.competition.id==item))
        return {
            props:{
                league:filteredLeague
            },
            revalidate:10
        }
    }
}

export default function Home({league}) {

  if(!league.length){
      return(
          <Layout>
          <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto mt-32'>
              <img src='/goal.svg' alt='logo' width='100%' height='auto'/>
              <h1 className='text-center text-2xl py-4 animate-pulse text-red-500 font-bold'>Maintenance Server</h1>
              <h1 className='text-center text-xl font-semibold'>Silahkan Pilih Halaman Lain</h1>
          </div>
          </Layout>
      )
  }
  return (
      <Layout>
        {league.map((item,index)=>(
            <League key={index} laga={item}/>
        ))}
      </Layout>
  )
}