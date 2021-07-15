import { useEffect, useState } from "react"
import Match from "./Match"
import {useRouter} from 'next/router'

const League = ({laga}) => {
    const [today, setToday] = useState([])
    const [nextDay, setNextDay] = useState([])
    const [lastDay, setLastDay] = useState([])
    const router = useRouter()

    const getToday = () => {
        setToday(laga.filter(item=>new Date(item.utcDate).getDate()===new Date().getDate()))
        setNextDay(laga.filter(item=>new Date(item.utcDate).getDate()===new Date().getDate()+1))
        setLastDay(laga.filter(item=>new Date(item.utcDate).getDate()===new Date().getDate()-1))
    }

    useEffect(()=>{
        getToday()
    },[])

    return(
        <>
        <div className={router.asPath==='/'?'block':'hidden'}>
            <div className={!laga.length?'hidden':'text-center bg-red-600 py-2 sticky top-12'}>
                <h1 className='capitalize text-xl font-bold'>
                    {!laga.length?'':laga[0].competition.name}
                </h1>
            </div>
            {laga.map((item,index)=>(
                <Match key={index} home={item.homeTeam.name} away={item.awayTeam.name} score1={item.score.fullTime.homeTeam} score2={item.score.fullTime.awayTeam} matchId={item.id} dateStart={item.utcDate} homeId={item.homeTeam.id} awayId={item.awayTeam.id} live={item.status}/>
            ))}
        </div>
        
        <div className={router.asPath==='/#kemarin'?'block':'hidden'}>
            <div className={!lastDay.length?'hidden':'text-center bg-red-600 py-2 sticky top-12'}>
                <h1 className='capitalize text-xl font-bold'>
                    {!lastDay.length?'':lastDay[0].competition.name}
                </h1>
            </div>
            {lastDay.map((item,index)=>(
                <Match key={index} home={item.homeTeam.name} away={item.awayTeam.name} score1={item.score.fullTime.homeTeam} score2={item.score.fullTime.awayTeam} matchId={item.id} dateStart={item.utcDate} homeId={item.homeTeam.id} awayId={item.awayTeam.id} live={item.status}/>
            ))}
        </div>

        <div className={router.asPath==='/#sekarang'&&today.length?'block':'hidden'}>
            <div className={!today.length?'hidden':'text-center bg-red-600 py-2 sticky top-12'}>
                <h1 className='capitalize text-xl font-bold'>
                    {!today.length?'':today[0].competition.name}
                </h1>
            </div>
            {today.map((item,index)=>(
                <Match key={index} home={item.homeTeam.name} away={item.awayTeam.name} score1={item.score.fullTime.homeTeam} score2={item.score.fullTime.awayTeam} matchId={item.id} dateStart={item.utcDate} homeId={item.homeTeam.id} awayId={item.awayTeam.id} live={item.status}/>
            ))}
        </div>
        
        <div className={router.asPath==='/#besok'?'block':'hidden'}>
            <div className={!nextDay.length?'hidden':'text-center bg-red-600 py-2 sticky top-12'}>
                <h1 className='capitalize text-xl font-bold'>
                    {!nextDay.length?'':nextDay[0].competition.name}
                </h1>
            </div>
            {nextDay.map((item,index)=>(
                <Match key={index} home={item.homeTeam.name} away={item.awayTeam.name} score1={item.score.fullTime.homeTeam} score2={item.score.fullTime.awayTeam} matchId={item.id} dateStart={item.utcDate} homeId={item.homeTeam.id} awayId={item.awayTeam.id} live={item.status}/>
            ))}
        </div>
        </>
    )
}
export default League