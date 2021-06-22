import { useEffect, useState } from "react"
import {GiSoccerBall} from 'react-icons/gi'

const Flag = ({flagId}) => {
    const [flag,setFlag] = useState({teams:null})
    const getFlag = async () => {
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${flagId}`)
        const data = await res.json()
        setFlag(data)
    }
    useEffect(()=>{
        getFlag()
    },[])

    return(flag.teams==null?<GiSoccerBall className='text-green-600 w-6 h-6 inline'/>
    :<img src={flag.teams[0].strTeamBadge}width='24'height='24'alt='team' className='inline'/>)
}
export default Flag