import Link from 'next/link'
import { useState } from 'react'
import {FaBars} from 'react-icons/fa'
import {useRouter} from 'next/router'

const Navbar = ({league}) => {
    const router = useRouter()
    const [open,setOpen] = useState(false)

    return (
        <div className='bg-gray-50 w-full filter drop-shadow-md border-b border-green-600 md:sticky top-0 z-50'>
        <div className='py-1'>
        <div className='flex justify-between'>
            <Link href='/'>
            <a className='p-2 ml-4 text-green-600 font-bold text-2xl'>Soccer Stat</a>
            </Link>
            <div onClick={()=>{setOpen(!open)}} className='p-2 mr-4 md:hidden' >
                <FaBars className='w-8 h-8 text-black'/>
            </div>
            <div className='bg-green-600 text-center mr-6 px-2 py-1 rounded-lg hidden md:block h-8 my-auto'>
            <a href='/' target='blank' 
            className='text-white font-semibold uppercase'>
                sbobet
            </a>
            </div>
        </div>
        <div className={open==false?'hidden':'block'} onClick={()=>setOpen(!open)} >
            <div className='flex flex-col px-4 border-t border-green-600 md:hidden'>
                <div className='bg-green-600 text-center px-2 py-1 rounded-lg max-w-max mt-4'>
                <a href='/' target='blank' 
                className='text-white font-semibold uppercase'>
                    sbobet
                </a>
                </div>
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
        </div>
        </div>
        </div>
    )
}
export default Navbar