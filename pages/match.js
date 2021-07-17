import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useRouter } from "next/router"


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

const Match = ({liga}) => {
    const router = useRouter()
    const [market , setMarket] = useState([])
    const [detail, setDetail] = useState(null)
    const [fullDetail,setFulldetail] = useState(null)
    const [load, setLoad] = useState('...Loading...')

    const getMatch = async () => {
        const resMarket = await fetch(`/api/market${router.asPath.slice(6)}`)
        const resDetail = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchevents.php?e=${router.query.team1}_vs_${router.query.team2}`)
        const dataDetail = await resDetail.json()
        const dataMarket = await resMarket.json()
        setMarket(dataMarket)
        const matchDetail = dataDetail.event == null ? null : dataDetail.event[0]
        setDetail(matchDetail)
        setFulldetail(dataDetail.event)
    }
    useEffect(()=>{
        setTimeout(()=>{
            setLoad('Sorry market detail not found')
        },5000)
        getMatch()
    },[])

    return(
        <Layout liga={liga} title={detail==null?'' : detail.strEvent}>
            {detail==null?'':
            <div className='flex flex-col md:flex-row'>
                {detail.strThumb==''?'': detail.strThumb==null?'':
                <div className='px-4 py-2 w-full md:w-1/2'>
                    <img src={detail.strThumb} width='100%' height='auto' alt='banner'/>
                    <div className='2xl:hidden text-center'>
                        <h1 className='font-semibold mb-1 text-xl'>{detail.strLeague}</h1>
                        <h1 className='font-semibold mb-1 text-xl'>{detail.strVenue}</h1>
                    </div>
                </div>
                }
                <div className={detail.strThumb==''?'px-4 py-2 w-full':'px-4 py-2 w-full md:w-1/2'}>
                    <div className='hidden 2xl:block'>
                        <h1 className='font-semibold mb-1 text-xl'>{detail.strLeague}</h1>
                        <h1 className='font-semibold mb-1 text-xl'>{detail.strVenue}</h1>
                    </div>
                    <h1 className='font-semibold my-1 text-center text-xl'>Head 2 Head</h1>
                    <div className='grid grid-cols-3 text-center border border-white'>
                        <h1 className='font-semibold mb-1'>{detail.strHomeTeam}</h1>
                        <h1 className='font-semibold mb-1'>{detail.strAwayTeam}</h1>
                        <h1 className='font-semibold mb-1'>Season</h1>
                    </div>
                    {fullDetail==null?'':
                    fullDetail.slice(0,5).map((item,index)=>(
                        <div key={index}>
                            <div className='grid grid-cols-3 text-center border border-white'>
                                <h1 className='font-semibold mb-1'>{item.intHomeScore}</h1>
                                <h1 className='font-semibold mb-1 border-l border-r border-white'>{item.intAwayScore}</h1>
                                <h1 className='font-semibold mb-1'>{item.strSeason}</h1>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            }
            <h1 className='text-2xl text-center font-bold py-2'>Markets</h1>
            {!market.length?
            <h1 className='text-center font-semibold text-2xl animate-pulse'>
             {load}
            </h1>
            :
            market.map((item,index)=>(
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank' key={index}>
                    <div className='bg-gray-700 even:bg-gray-800 mb-4 border border-white'>
                        <h1 className='text-center font-semibold px-4 py-2 border border-white bg-red-600'>{item.name}</h1>
                        <div className='grid grid-flow-row grid-cols-3'>
                            {item.events.map((bet,indexBet)=>(
                                <div className='text-center border border-white' key={indexBet}>
                                    <h1 className='font-semibold'>{bet.name} {bet.base==''?'':': '+bet.base}</h1>
                                    <h1 className='font-bold'>{bet.price}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </a>
            ))
            }
        </Layout>
    )
}

export default Match