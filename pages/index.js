import Jadwal from "../components/home/Jadwal"
import Layout from "../components/home/Layout"
import {HiRefresh} from 'react-icons/hi'
import { useState } from "react"
import Link from 'next/link'
import {BiDownArrow,BiUpArrow} from 'react-icons/bi'

export const getStaticProps = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const champions = data.sport[1].region[20001].competition[566]
    const laliga = data.sport[1].region[2150001].competition[545]
    const premiere = data.sport[1].region[2570001].competition[538]
    const bundesliga = data.sport[1].region[900001].competition[541]
    const ligue1 = data.sport[1].region[830001].competition[548]
    const serieAbrazil = data.sport[1].region[390001].competition[1792]
    const ligaProfesional = data.sport[1].region[180001].competition[1685]
    const eredivisie = data.sport[1].region[1640001].competition[1957]
    const mls = data.sport[1].region[2420001].competition[3025]
    const premiereRus = data.sport[1].region[1900001].competition[1993]
    const championship = data.sport[1].region[2570001].competition[539]
    const libertadores = data.sport[1].region[60001].competition[2988]
    const team = [champions,laliga,premiere,championship,bundesliga,ligue1,serieAbrazil,ligaProfesional,eredivisie,premiereRus,libertadores,mls]

    return {
        props: {
            matchs : team,
            allMatchs : data.sport[1].region
        },
        revalidate : 1
    }
}

const Vbet = ({matchs, allMatchs}) => {
    const [open, setOpen] = useState(false)
    const firstPage = !allMatchs?null:!Object.values(allMatchs[20001].competition)?null:Object.values(allMatchs[20001].competition)

    if(!allMatchs){
        return(
            <Layout>
                <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto'>
                    <img src='/logo.svg' alt='logo' width='100%' height='auto' className='animate-pulse'/>
                    <h1 className='text-center text-2xl py-4 font-bold'>Page Not Found</h1>
                    <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
                </div>
            </Layout>
        )
    }

    return(
        <Layout desc={matchs.map(item=>item.name).join(' ')} keyw={matchs.map(item=>item.name).join(', ')} >
            <div className='px-4 py-2'>
                <a href='/' className='md:text-xl font-bold'>
                    Please <HiRefresh className='inline'/> reload page if data outdated
                </a>
            </div>
            <div className='bg-red-600 py-2 px-4 sticky top-12 flex items-center border-b border-white' onClick={()=>setOpen(!open)}>
                <h1 className='capitalize text-xl font-bold w-full text-center'>
                    {firstPage==null?'Sorry no matches found':firstPage[0].name}
                </h1>
                {open==false?<BiUpArrow className='w-7 h-7 flex-none'/>:<BiDownArrow className='w-7 h-7 flex-none'/>}
            </div>
            <div className={open==false?'block':'hidden'}>
                {firstPage==null?
                    <div className='text-center px-4 font-semibold py-2'>
                        <h1>Sorry no matches found</h1>
                    </div>
                    :
                    Object.values(firstPage[0].game).map((item,index)=>(
                    <div key={index} className='even:bg-gray-800 bg-gray-700'>
                        <div className='text-center pt-2 pb-1 border-b border-white'>
                            <h1 className='text-sm italic'>
                            {item.start_ts.slice(0,16)} WIB
                            </h1>
                        </div>
                        <div className='flex px-4 font-semibold items-center py-2'>
                            <div className='w-1/3'>
                                <Link href={'/team/'+item.team1_name.toLowerCase()}>
                                    <a>{item.team1_name}</a>
                                </Link>
                            </div>
                            {item.team2_name==undefined?'':
                            <div className='w-1/3 text-center'>
                                <h1>? : ?</h1>
                            </div>
                            }
                            {item.team2_name==undefined?'':
                            <div className='w-1/3 text-right'>
                                <Link href={'/team/'+item.team2_name.toLowerCase()}>
                                    <a>{item.team2_name}</a>
                                </Link>
                            </div>
                            }
                        </div>
                    </div>
                    ))
                }
            </div>
            {matchs.map((item,index)=>(
                <Jadwal nama={item.name} game={item.game} key={index}/>
            ))}
        </Layout>
    )
}
export default Vbet