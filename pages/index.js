import { useEffect, useState } from 'react'
import { SoccerKey } from '../lib/socerApi'
import Navbar from '../components/home/Navbar';
import League from '../components/home/League';
import Image from 'next/image'
import Sidebar from '../components/home/Sidebar';

export const getStaticProps = async () => {
    const res = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE',{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    const data = await res.json();
    return {
        props:{
            league:data.competitions.sort((a,b)=>a.id-b.id)
        },
        revalidate:60
    }
}

export default function Home({league}) {
  const [laga,setLaga]=useState([])

  const getMatch = async () => {
      const res = await fetch('/api/matchs')
      const data = await res.json()
      const sorted = data.matches.sort((a,b)=>a.competition.id-b.competition.id)
      const uniqueLeagueId = [...new Set(sorted.map(item => item.competition.id))];
      const filteredLeague = uniqueLeagueId.map(item=>sorted.filter(isi=>isi.competition.id==item))
      setLaga(filteredLeague)
  }

  useEffect(()=>{
      getMatch()
  },[])

  return (
      <>
      <Navbar team={league}/>
      <main className='mt-12'>
        <div className='flex relative z-20'>
            <div className='flex-none w-64 hidden lg:block self-start sticky top-12'>
                <Sidebar team={league}/>
            </div>
            <div className='w-full z-40 bg-gray-900 min-h-screen'>
                {laga.map((item,index)=>(
                    <League key={index} laga={item}/>
                ))}
            </div>
            <div className='flex-none w-40 hidden md:block self-start sticky top-12'>
                <Image src='/ads-160x600.png' width={160} height={600} alt='ads'/>
            </div>
        </div>
      </main>
        <footer className='text-center border-t border-white py-4 bg-gray-900'>
            <h1 className='text-sm font-semibold italic'>Planet Football<span> @{new Date().getFullYear()}</span></h1>
        </footer>
      </>
  )
}