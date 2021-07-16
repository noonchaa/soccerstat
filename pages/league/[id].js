import Layout from "../../components/home/Layout"
import { useRouter } from "next/router"
import {HiRefresh} from 'react-icons/hi'
import JadwalOpen from "../../components/home/JadwalOpen"

export const getStaticPaths = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const allMatchs = data.sport[1].region
    const regionId = Object.values(allMatchs).slice(1)
    const paths = regionId.map(item=>({
        params : {
            id:item.id.toString()
        }
    }))

    return {
        paths,
        fallback:false
    }
}
export const getStaticProps = async ({params}) => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()

    return {
        props : {
            allMatchs : data.sport[1].region,
            liga : data.sport[1].region[params.id]
        },
        revalidate : 1
    }
}

const Region = ({liga,allMatchs}) => {
    const router = useRouter()
    const allTeams = !allMatchs?null:Object.values(allMatchs)
    
    if(router.isFallback){
        return(
            <Layout allComp={allTeams==null?null:allTeams.slice(1)}>
                <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto'>
                    <img src='/logo.svg' alt='logo' width='100%' height='auto' className='animate-pulse'/>
                    <h1 className='text-center text-2xl py-4 font-bold'>Page Not Found</h1>
                    <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
                </div>
            </Layout>
        )
    }
    return(
        <Layout allComp={allTeams==null?null:allTeams.slice(1)}>
        <div className='px-4 py-2'>
            <a href={router.asPath} className='md:text-xl font-bold'>
                Please <HiRefresh className='inline'/> reload page if data outdated
            </a>
        </div>
        {Object.values(liga.competition).map((item,index)=>(
            <JadwalOpen nama={item.name} game={item.game} key={index} alias={liga.alias} ligaId={item.id}/>
        ))}
        </Layout>
    )
}
export default Region