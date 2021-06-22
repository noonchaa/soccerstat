import { useEffect, useState } from "react"
import Flag from "./Flag"

const LiveMatch = ({authKey}) => {
    const options = {hour:'2-digit',minute:'2-digit'}
    const [match,setMatch] = useState([])
    const getLive = async () => {
        const res = await fetch(`https://api.betting-api.com/fonbet/football/live/all`,{
            method:'GET', headers: {'Authorization' : authKey}
        })
        const data = await res.json()
        setMatch(data)
    }
    const updatePerMinute = () => {
        setInterval(() => {
            getLive()
        },60000)
    }
    useEffect(()=>{
        getLive()
        updatePerMinute()
    },[])
    const sorted = match.filter(item=>item.name=='').filter(item=>item.isCyber==false).sort((a,b)=>a.num-b.num)

    return (
        <section  className='bg-gray-50 pt-3 text-center'>
        {sorted.map((item,index) => (
            <div className='bg-gray-100 mt-2 text-center' key={index}>
                <h1 className='text-base font-semibold text-green-600 capitalize' >
                    {item.title}
                </h1>
            <div className='grid grid-cols-4 grid-rows-4 px-2 text-center gap-y-1 border-t border-black pt-1'>
            <h1 className='text-sm font-bold text-green-600 capitalize'>
                {item.place=='line'?new Date(item.date_start).toLocaleString('id-ID',options)+' WIB':item.place}
            </h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.team1}
            </h1>
            <div className='flex justify-between'>
                <div>
                <Flag flagId={item.team1}/>
                </div>
                <h1 className='text-sm font-semibold text-black capitalize'>vs</h1>
                <div>
                <Flag flagId={item.team2}/>
                </div>
            </div>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.team2}
            </h1>
            <h1 className='text-sm font-semibold text-black capitalize'>score</h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.score1==undefined?'?':item.score1}
            </h1>
            <h1 className='text-sm font-bold text-black capitalize'>:</h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.score2==undefined?'?':item.score2}
            </h1>
            <h1 className='text-sm font-semibold text-black capitalize'>1X2</h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.markets.win1==undefined?'x':item.markets.win1.value}
            </h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.markets.winX==undefined?'x':item.markets.winX.value}
            </h1>
            <h1 className='text-sm font-bold text-black capitalize'>
                {item.markets.win2==undefined?'x':item.markets.win2.value}
            </h1>
            <h1 className='text-sm font-semibold text-black capitalize'>handicaps</h1>
            <h1 className='text-xs text-black capitalize' >
                {item.markets.handicaps1.length==0?'':'('+item.markets.handicaps1[0].type+') '}
                <span className='text-sm font-bold'>
                {item.markets.handicaps1.length==0?'x':item.markets.handicaps1[0].value}
                </span></h1>
            <h1 className='text-sm font-bold text-black capitalize'>-</h1>
            <h1 className='text-xs text-black capitalize' >
                {item.markets.handicaps2.length==0?'':'('+item.markets.handicaps2[0].type+') '}
                <span className='text-sm font-bold'>
                {item.markets.handicaps2.length==0?'x':item.markets.handicaps2[0].value}
                </span></h1>
            </div>
            </div>
        ))}
        </section>
    )
}
export default LiveMatch