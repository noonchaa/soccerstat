import Link from 'next/link'
import { useState } from 'react'
import {FaBars} from 'react-icons/fa'

const HeadMob = ({children}) => {
    const [open,setOpen] = useState(false)

    return (
        <div className='bg-gray-50 w-full filter drop-shadow-md border-b border-green-600'>
            <div className='py-1'>
                <div className='flex justify-between'>
                <Link href='/'>
                    <a className='p-2 ml-4 text-green-600 font-bold text-2xl'>
                        Soccer Stat
                    </a>
                </Link>
                <div onClick={()=>setOpen(!open)} className='p-2 mr-4 md:hidden' >
                    <FaBars className='w-8 h-8 text-black'/>
                </div>
                <a href='/' target='blank' 
                className='bg-green-600 text-white text-center font-bold text-xl mr-4 px-3 py-2 rounded-lg uppercase
                    hidden md:block' >
                    Pasang Bet
                </a>
                </div>
                <div className={open==false?'hidden':'block'} onClick={()=>setOpen(!open)} >
                <div className='flex flex-col px-4 border-t border-green-600'>
                <a href='/' target='blank' 
                className='bg-green-600 text-white text-center font-bold text-xl py-2 mt-2 rounded-lg uppercase' >
                    Pasang Bet
                </a>
                {children}
                </div>
                </div>
            </div>
        </div>
    )
}
export default HeadMob