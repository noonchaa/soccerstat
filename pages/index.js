import Jadwal from "../components/home/Jadwal"
import Layout from "../components/home/Layout"
import {HiRefresh} from 'react-icons/hi'
import { useState } from "react"
import Link from 'next/link'
import {BsBoxArrowUpRight,BsArrowsCollapse,BsArrowsExpand,BsArrowUpDown} from 'react-icons/bs'

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
    const [open, setOpen] = useState(false)
    const [show,setShow] = useState(false)
    const allTeams = !allMatchs?null:Object.values(allMatchs)
    const firstTeam = allTeams==null?null:Object.values(allTeams.slice(1,2)[0].competition).slice(0,1)[0]

    if(!allMatchs){
        return(
            <Layout allComp={allTeams.slice(1)}>
                <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto'>
                    <img src='/logo.svg' alt='logo' width='100%' height='auto' className='animate-pulse'/>
                    <h1 className='text-center text-2xl py-4 font-bold'>Page Not Found</h1>
                    <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
                </div>
            </Layout>
        )
    }

    return(
        <Layout allComp={allTeams.slice(1)}>
            <div className='px-4 py-2'>
                <a href='/' className='md:text-xl font-bold'>
                    Please <HiRefresh className='inline'/> reload page if data outdated
                </a>
            </div>
            <div className='bg-red-600 py-2 px-4 sticky top-12 flex items-center border-b border-white cursor-pointer z-20' onClick={()=>setOpen(!open)}>
                <h1 className='capitalize text-xl font-bold w-full text-center'>
                    {firstTeam==null?'Sorry no matches found':firstTeam.name}
                </h1>
                {open==false?<BsArrowsCollapse className='w-7 h-7 flex-none'/>:<BsArrowsExpand className='w-7 h-7 flex-none'/>}
            </div>
            {open==true?'':
            <div className={open==false?'block':'hidden'}>
                <div className='px-4 py-2 text-center'>
                    <h1 className='capitalize font-bold text-lg'>
                        {allTeams==null?'':allTeams.slice(1,2)[0].alias}
                    </h1>
                </div>
                {firstTeam==null?
                    <div className='text-center px-4 font-semibold py-2'>
                        <h1>Sorry no matches found</h1>
                    </div>
                    :
                    Object.values(firstTeam.game).map((item,index)=>(
                    <div key={index} className='even:bg-gray-800 bg-gray-700'>
                        <div className='pt-2 pb-1 px-4 border-b border-white flex items-center'>
                            <h1 className='text-sm italic w-1/2 text-center'>
                            {item.start_ts.slice(0,16)} WIB
                            </h1>
                            <Link href='/markets'>
                                <a className='uppercase font-semibold w-1/2 text-center text-sm'>
                                markets <sup><BsBoxArrowUpRight className='inline'/></sup>
                                </a>
                            </Link>
                        </div>
                        <div className='flex px-4 font-semibold items-center py-2'>
                            <div className={item.team2_name==undefined?'w-full text-center':'w-1/3'}>
                                <Link href={item.team1_name==undefined?'/':'/team/'+item.team1_name}>
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
                                <Link href={item.team2_name==undefined?'/':'/team/'+item.team2_name}>
                                    <a>{item.team2_name}</a>
                                </Link>
                            </div>
                            }
                        </div>
                    </div>
                    ))
                }
            </div>
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