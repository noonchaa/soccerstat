import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Live from "../components/Live"
import Loading from "../components/Loading"


export const getStaticProps = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const allMatchs = data.sport[1].region
    const navRoute = Object.values(allMatchs).map(item=>({liga:Object.values(item.competition).map(isi=>isi.name),id:item.id,alias:item.alias}))

    return {
        props: {
            liga : navRoute
        },
        revalidate : 1
    }
}

const Home = ({liga}) => {
    const [live,setLive] = useState([])
    const [match, setMatch] = useState([])

    const getLive = async () => {
        const res = await fetch('/api/live')
        const data = await res.json()
        setLive(Object.values(data))
    }
    const getMatch = async () => {
        const resMatch = await fetch('/api/match')
        const dataMatch = await resMatch.json()
        setMatch(Object.values(dataMatch))
    }

    useEffect(()=>{
        getLive()
    },[])
    
    return(
        <Layout liga={liga}>
            {!live.length?<Loading/>:
                live.map((item)=>(
                    Object.values(item.competition).map((liga,index)=>(
                        <div className='bg-gray-700 even:bg-gray-800 mb-4' key={index}>
                            <div className='py-2 px-4 flex items-center justify-center bg-red-600'>
                                <div className='w-5 h-5 rounded-full bg-green-500 animate-pulse'></div>
                                <h1 className='pl-2 text-sm italic'>LIVE</h1>
                                <h1 className='pl-2 text-xl italic font-bold'>{liga.name}</h1>
                                <h1 className='pl-2 text-xl font-bold'>{item.alias}</h1>
                            </div>
                            <Live game={liga.game} />
                        </div>
                    ))
                ))
            }
            {!match.length?'':
                match.map((item)=>(
                    Object.values(item.competition).map((liga,index)=>(
                        <div className='mb-4' key={index}>
                            <div className='py-2 px-4 flex items-center justify-center bg-red-600'>
                                <h1 className='pl-2 text-xl italic font-bold'>{liga.name}</h1>
                                <h1 className='pl-2 text-xl font-bold'>{item.alias}</h1>
                            </div>
                            <Live game={liga.game} />
                        </div>
                    ))
                ))
            }
            <div className={!match.length?'block cursor-pointer':'hidden'}>
                <h1 className='text-2xl bg-black text-center font-bold py-4 mb-4' onClick={()=>getMatch()}>
                    Load More
                </h1>
            </div>
        </Layout>
    )
}
export default Home