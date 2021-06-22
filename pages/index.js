import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { SoccerKey } from '../lib/socerApi'
import ServerInfo from '../components/ServerInfo'
import Image from 'next/image'
import LiveMatch from '../components/LiveMatch'
import SortedMatch from '../components/SortedMatch'
import HeadMob from '../components/HeadMob'
import {BiUpArrow} from 'react-icons/bi'

export default function Home() {
  const [show,setShow] = useState('today')
  const [league,setLeague] = useState([])
  const today = new Date().toISOString().substring(0,10)
  const next = new Date()
  next.setDate(next.getDate()+1)
  const getLiveMatch = async () => {
      const res = await fetch('https://api.betting-api.com/fonbet/football/line/all',{
          method:'GET', headers: {'Authorization' : SoccerKey}
      })
      const data = await res.json()
      setLeague(data)
  }
  useEffect(()=> {
      getLiveMatch()
  },[])
  const todayMatch =
  league.filter(item =>item.date_start.substring(0,10)==today).
  filter(item=>item.notMatch==undefined).
  filter(item=>item.isCyber==false).
  filter(item=>item.name=='').
  sort((a,b)=>a.num-b.num)

  const nextMatch = 
  league.filter(item => item.date_start.substring(0,10)==next.toISOString().substring(0,10)).
  filter(item=>item.notMatch==undefined).
  filter(item=>item.isCyber==false).
  filter(item=>item.name=='').
  sort((a,b)=>a.num-b.num)

  const topLeague = 
  league.filter(item=>item.notMatch==undefined).
  filter(item=>item.isCyber==false).
  filter(item=>item.name=='').
  sort((a,b)=>a.num-b.num)

  const uniqueLeagueId = [...new Set(topLeague.map(item => item.league_id))]

  const filteredLeague = uniqueLeagueId.map(item=>topLeague.filter(isi=>isi.league_id==item))
  const todayFiltered = uniqueLeagueId.map(item=>todayMatch.filter(isi=>isi.league_id==item))
  const nextFiltered = uniqueLeagueId.map(item=>nextMatch.filter(isi=>isi.league_id==item))

  const toTop = () => window.scrollTo({top:0,behavior:'smooth'})

  return (
    <Layout title='Soccer Stat' desc='Jadwal dan hasil pertandingan sepak bola lengkap dengan informasi pasaran 
      taruhan' keyword='update' league={filteredLeague} >
      <HeadMob league={filteredLeague}>
      {filteredLeague.map((item,index)=>(
            <div className='w-full py-4 border-b border-black cursor-pointer'key={index}
            onClick={()=>setShow(item[0].hash)}>
              <h1 className={show==item[0].hash?'text-base font-semibold text-green-600 capitalize':
                            'text-base font-semibold text-black capitalize'}>
                {item[0].title}
              </h1>
            </div>
          ))}
      </HeadMob>
      <div className='flex justify-center relative filter drop-shadow-md overflow-hidden'>
      <aside className='flex-none w-52 p-1 bg-gray-50 filter drop-shadow-md hidden md:block'>
          <div className='w-full'>
            <Image src='/mid.jpg' layout='responsive' width={300} height={250} alt='advertisment'/>
          </div>
          {filteredLeague.map((item,index)=>(
            <div className='w-full py-4 border-b border-black cursor-pointer'key={index}
            onClick={()=>{
              setShow(item[0].hash)
              toTop()
            }}>
              <h1 className={show==item[0].hash?'text-base font-semibold text-green-600 capitalize':
                            'text-base font-semibold text-black capitalize'}>
                {item[0].title}
              </h1>
            </div>
          ))}
      </aside>
      <section className='w-full'>
          <ServerInfo/>
          <section className='bg-gray-50 filter drop-shadow-lg py-2 border-green-600 border-b'>
            <div className='flex justify-around' >
                <h1 className={show=='live'?'text-base font-semibold text-green-600 capitalize cursor-pointer':
                              'text-base font-semibold text-black capitalize cursor-pointer'} 
                    onClick={()=>setShow('live')}>
                  Live
                </h1>
                <h1 className={show=='today'?'text-base font-semibold text-green-600 capitalize cursor-pointer':
                              'text-base font-semibold text-black capitalize cursor-pointer'}
                    onClick={()=>setShow('today')}>
                  Hari ini
                </h1>
                <h1 className={show=='next'?'text-base font-semibold text-green-600 capitalize cursor-pointer':
                              'text-base font-semibold text-black capitalize cursor-pointer'}
                    onClick={()=>setShow('next')}>
                  besok
                </h1>
            </div>
        </section>
      <article className='w-full bg-gray-100'>
        <div className={show=='live'?'block':'hidden'}>
        <LiveMatch authKey={SoccerKey} />
        </div>
        <div className={show=='today'?'block':'hidden'}>
        {todayFiltered.map((item,index)=>(
          <SortedMatch key={index} matchs={item} />
        ))}
        </div>
        <div className={show=='next'?'block':'hidden'}>
        {nextFiltered.map((item,index)=>(
          <SortedMatch key={index} matchs={item} />
        ))}
        </div>
        {filteredLeague.map((item,index)=>(
          <div key={index} className={show==item[0].hash?'block':'hidden'} >
            <SortedMatch matchs={item}/>
          </div>
        ))}
      </article>
      </section>
      </div>
      <div className='p-2 bg-black rounded-full w-10 h-10 fixed bottom-12 right-12 lg:right-52 z-50 cursor-pointer'
      onClick={()=>toTop()}>
        <BiUpArrow className='w-6 h-6 text-white animate-bounce'/>
      </div>
    </Layout>
  )
}
