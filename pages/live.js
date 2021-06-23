import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Match from "../components/layout/Match";
import { SoccerKey } from '../lib/socerApi';
import Loading from "../components/layout/Loading";

export const getStaticProps = async () => {
    const res = await fetch('https://api.betting-api.com/fonbet/football/line/all',{
        method:'GET', headers: {'Authorization' : SoccerKey}
    })
    const data = await res.json();
    const topLeague = 
    data.filter(item=>item.notMatch==undefined).
    filter(item=>item.isCyber==false).
    filter(item=>item.name=='').
    sort((a,b)=>a.num-b.num);
    const uniqueLeagueId = [...new Set(topLeague.map(item => item.league_id))];
    const filteredLeague = uniqueLeagueId.map(item=>topLeague.filter(isi=>isi.league_id==item))
    return {
        props:{
            league:filteredLeague
        },
        revalidate:10
    }
}

const Live = ({league}) => {
    const [live,setLive]=useState([])

    const getLive = async () => {
        const res = await fetch(`https://api.betting-api.com/fonbet/football/live/all`,{
            method:'GET', headers: {'Authorization' : SoccerKey}
        })
        const data = await res.json()
        const sorted = data.filter(item=>item.name=='').filter(item=>item.isCyber==false).sort((a,b)=>a.num-b.num)
        const id = [...new Set(sorted.map(item => item.league_id))]
        const filtered = id.map(item=>sorted.filter(isi=>isi.league_id==item))
        setLive(filtered)
    }

    const updatePerMinute = () => {
        setInterval(() => {
            getLive()
        },60000)
    }

    useEffect(()=>{
        getLive()
        updatePerMinute()
        return () => {setLive([])}
    },[])


    return(
        <Layout
        title='Live Match'
        desc=''
        keyword=''
        league={league}
        left='/sk-left.jpg'
        right='/sk-right.jpg'
        link='/'
        mtop='/foot.gif'
        ttop='/top.jpg'
        tmid='/mid.jpg'
        mfoot='/top.jpg'
        >
        {!live.length?
        <Loading/>
        :
        live.map((item,index)=>(
          <Match key={index} matchs={item}/>
        ))
        }
        </Layout>
    )
}
export default Live