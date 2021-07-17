import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Live from "../../components/Live"

export const getStaticPaths = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const allMatchs = data.sport[1].region
    const navRoute = Object.values(allMatchs).map(item=>item.id)
    const paths = navRoute.map(item => ({
        params : {
            liga : item.toString()
        }
    }))

    return {
        paths,
        fallback : true
    }
}
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

const League = ({liga}) => {
    const router = useRouter()
    const [match, setMatch] = useState([])

    const getMatch = async () => {
        const res = await fetch(`/api/league?id=${router.asPath.slice(8)}`)
        const data = await res.json()
        setMatch(Object.values(data))
    }

    useEffect(()=>{
        getMatch()
    },[router.asPath])

    return(
        <Layout liga={liga}>
            {!match.length?'':
                match.map((item)=>(
                    Object.values(item.competition).map((liga,index)=>(
                        <div className='bg-gray-700 even:bg-gray-800 mb-4' key={index}>
                        <div className='py-2 px-4 flex items-center justify-center bg-red-600'>
                            <h1 className='pl-2 text-xl italic font-bold'>{liga.name}</h1>
                            <h1 className='pl-2 text-xl font-bold'>{item.alias}</h1>
                        </div>
                            <Live game={liga.game} />
                        </div>
                    ))
                ))
            }
        </Layout>
    )
}

export default League