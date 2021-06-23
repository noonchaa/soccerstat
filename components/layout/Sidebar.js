import MidAds from "../ads/MidAds"
import Link from "next/link"
import { useState } from "react"
import {IoIosArrowDown} from 'react-icons/io'
import {useRouter} from 'next/router'

const Sidebar = ({league,img,link}) => {
    const router = useRouter()
    const [open,setOpen] = useState(false)
    return(
        <aside className='flex-none w-52 p-1 bg-gray-50 filter drop-shadow-md hidden md:block'>
            <MidAds  img={img} link={link}/>
            <div className={open==false?'block':'hidden'}>
            {league.slice(0,3).map((item,index)=>(
                <div className='w-full py-4 border-b border-black cursor-pointer' key={index}>
                <Link href={'/league/'+item[0].league_id}>
                    <a className={router.asPath==='/league/'+item[0].league_id?
                    'font-semibold text-green-600':'font-semibold text-black'}>
                        {item[0].title}
                    </a>
                </Link>
                </div>
            ))}
            </div>
            <div className={open==false?'w-full py-4 cursor-pointer text-center':'hidden'}
            onClick={()=>setOpen(!open)}>
                <h1 className='font-semibold text-black'>
                    Semua Kompetisi <IoIosArrowDown className='inline ml-4'/>
                </h1>
            </div>
            <div className={open==false?'hidden':'w-full pt-4 cursor-pointer text-center'}
            onClick={()=>setOpen(!open)}>
                <h1 className='font-semibold text-black'>
                    Tutup <IoIosArrowDown className='inline ml-4'/>
                </h1>
            </div>
            <div className={open==false?'hidden':'block'}>
            {league.map((item,index)=>(
                <div className='w-full py-4 border-b border-black cursor-pointer' key={index}>
                <Link href={'/league/'+item[0].league_id}>
                    <a className={router.asPath==='/league/'+item[0].league_id?
                    'font-semibold text-green-600':'font-semibold text-black'}>
                        {item[0].title}
                    </a>
                </Link>
                </div>
            ))}
            </div>
        </aside>
    )
}
export default Sidebar