import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/layout/Loading';
import Match from '../../components/layout/Match';
import { SoccerKey } from '../../lib/socerApi'

export const getStaticPaths = async () => {
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
    const filteredLeague = uniqueLeagueId.map(item=>topLeague.filter(isi=>isi.league_id==item));
    const paths = filteredLeague.map(item=>{
        return {
            params:{id:item[0].league_id.toString()}
        }
    })
    return {
        paths,
        fallback:true
    }
}

export const getStaticProps = async ({params}) => {
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
    const filteredLeague = uniqueLeagueId.map(item=>topLeague.filter(isi=>isi.league_id==item));
    const theId = uniqueLeagueId.filter(item => item == params.id)
    return {
        props : {
            league:filteredLeague,
            id:theId
        },
        revalidate:10
    }
}

const League = ({league,id}) => {
    const [laga,setLaga]=useState([])

    const getMatch = async () => {
        const res = await fetch(`https://api.betting-api.com/fonbet/football/line/league/${id}/matches`,{
            method:'GET', headers: {'Authorization' : SoccerKey}
        })
        const data = await res.json();
        const sortedData = 
        data.sort((a,b)=>a.num - b.num).
        filter(item=>item.name=='');
        setLaga(sortedData)
    }

    useEffect(()=>{
        getMatch()
        return () => {setLaga([])}
    },[id])
  
    return (
        <Layout
        title={!laga.length?'':laga[0].title}
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
        {!laga.length?
            <Loading/>
            :
            <Match matchs={laga}/>
        }
        </Layout>
    )
}
export default League