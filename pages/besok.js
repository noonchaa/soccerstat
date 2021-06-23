import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Match from "../components/layout/Match";
import { SoccerKey } from '../lib/socerApi';

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

const Besok = ({league}) => {
    const [laga,setLaga]=useState([])

    const getMatch = async () => {
        const res = await fetch('https://api.betting-api.com/fonbet/football/line/all',{
            method:'GET', headers: {'Authorization' : SoccerKey}
        })
        const data = await res.json()
        const today = new Date()
        today.setDate(today.getDate()+1)
        const nextMatch = 
        data.filter(item => item.date_start.substring(0,10)==today.toISOString().substring(0,10)).
        filter(item=>item.notMatch==undefined).
        filter(item=>item.isCyber==false).
        filter(item=>item.name=='').
        sort((a,b)=>a.num-b.num);
        const uniqueLeagueId = [...new Set(nextMatch.map(item => item.league_id))];
        const filteredLeague = uniqueLeagueId.map(item=>nextMatch.filter(isi=>isi.league_id==item))
        setLaga(filteredLeague)
    }

    useEffect(()=>{
        getMatch()
        return () => {setLaga([])}
    },[])

    return(
        <Layout
        title='Jadwal besok'
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
        {laga.map((item,index)=>(
            <Match key={index} matchs={item}/>
        ))}
        </Layout>
    )
}
export default Besok