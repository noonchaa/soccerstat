import Jadwal from "../components/home/Jadwal"
import Layout from "../components/home/Layout"
import {HiRefresh} from 'react-icons/hi'
import { useState } from "react"
import {BsArrowUpDown} from 'react-icons/bs'
import JadwalOpen from "../components/home/JadwalOpen"

export const getStaticProps = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()

    return {
        props: {
            allMatchs : data.sport[1].region
        },
        revalidate : 1
    }
}

const Vbet = ({allMatchs}) => {
    const [show,setShow] = useState(false)
    const allTeams = !allMatchs?null:Object.values(allMatchs)

    if(!allMatchs){
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
                <a href='/' className='md:text-xl font-bold'>
                    Please <HiRefresh className='inline'/> reload page if data outdated
                </a>
            </div>
            {allTeams==null?'':
                allTeams.slice(1,2).map((region)=>(
                    Object.values(region.competition).slice(0,1).map((item,index)=>(
                        <JadwalOpen nama={item.name} game={item.game} key={index} alias={region.alias}/>
                    ))
                ))
            }
            {allTeams==null?'':
                allTeams.slice(2,7).map((region)=>(
                    Object.values(region.competition).slice(0,1).map((item,index)=>(
                        <Jadwal nama={item.name} game={item.game} key={index} alias={region.alias}/>
                    ))
                ))
            }
            {allTeams==null?'': show == false ?'':
                allTeams.slice(7).map((region)=>(
                    Object.values(region.competition).slice(0,1).map((item,index)=>(
                        <Jadwal nama={item.name} game={item.game} key={index} alias={region.alias}/>
                    ))
                ))
            }
            <div className='px-4 py-2 text-center cursor-pointer' onClick={()=>setShow(!show)}>
                <h1 className='capitalize font-bold text-lg'>
                <BsArrowUpDown className='inline mr-4'/>{show==false?'Show all matches':'Hide matches'}<BsArrowUpDown className='inline ml-4'/>
                </h1>
            </div>
        </Layout>
    )
}
export default Vbet