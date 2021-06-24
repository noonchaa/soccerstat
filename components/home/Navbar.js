import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function Navbar(){
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return(
        <>
        <div className={open==false?
        'transition duration-500 origin-left transform scale-x-0 z-50 w-80 fixed top-0 h-screen overflow-y-auto overscroll-none bg-gray-50'
        :
        'transition duration-500 origin-left transform scale-100 z-50 w-80 fixed top-0 h-screen overflow-y-auto overscroll-none bg-gray-50'}>
        <div className='bg-red-600 px-4 py-2 flex justify-between items-center cursor-pointer'>
            <MdClose className='w-6 h-6 text-white' onClick={()=>setOpen(!open)}/>
            <Link href='/'>
                <a className='text-white ml-3 font-bold italic'>Soccer Stat</a>
            </Link>
        </div>
        <div className='h-28 -mb-3 w-full'>
            <Image src='/ads-320x100.png' width={320} height={100} alt='advertisement'/>
        </div>
        <div className='flex flex-col md:hidden'>
        <Link href='/live'>
            <a className={router.asPath==='/live'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600 bg-gray-50':
                'pl-4 py-2 font-medium text-sm text-blue-900 bg-gray-100 border-b border-gray-300'}>
            Live
            </a>
        </Link>
        <Link href='/'>
            <a className={router.asPath==='/'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600 bg-gray-50':
                'pl-4 py-2 font-medium text-sm text-blue-900 border-b border-gray-300'}>
            {new Date().getDate()}-{new Date().toLocaleString('id-ID',{month:'short'})}
            </a>
        </Link>
        <Link href='/besok'>
            <a className={router.asPath==='/besok'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600':
                'pl-4 py-2 font-medium text-sm text-blue-900 bg-gray-100 border-b border-gray-300'}>
            {new Date().getDate()+1}-{new Date().toLocaleString('id-ID',{month:'short'})}
            </a>
        </Link>
        </div>
        <div className='flex flex-col'>
        <Link href='/live'>
            <a className={router.asPath==='/league/'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600':
                'pl-4 py-2 font-medium text-sm text-blue-900 border-b border-gray-300'}>
                European Championship. 1/8 finals
            </a>
        </Link>
        <Link href='/'>
            <a className={router.asPath==='/league/'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600':
                'pl-4 py-2 font-medium text-sm text-blue-900 bg-gray-100 border-b border-gray-300'}>
                European Championship. 1/8 finals
            </a>
        </Link>
        <Link href='/besok'>
            <a className={router.asPath==='/league/'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600':
                'pl-4 py-2 font-medium text-sm text-blue-900 border-b border-gray-300'}>
            European Championship. 1/8 finals
            </a>
        </Link>
        <Link href='/besok'>
            <a className={router.asPath==='/league/'?
                'pl-3 py-2 font-medium text-red-600 italic text-sm border-r-4 border-red-600':
                'pl-4 py-2 font-medium text-sm text-blue-900 bg-gray-100 border-b border-gray-300'}>
            European Championship. 1/8 finals
            </a>
        </Link>
        <div className='h-screen'></div>
        </div>
        </div>

        <header className='flex justify-between items-center bg-gray-50 fixed top-0 w-full max-w-screen-2xl z-40'>
            <div className='bg-red-600 px-4 py-2 flex justify-between items-center cursor-pointer'>
                <FaBars className='w-6 h-6 text-white' onClick={()=>setOpen(!open)}/>
                <Link href='/'>
                    <a className='text-white ml-3 font-bold italic'>Soccer Stat</a>
                </Link>
            </div>
            <div className='hidden md:grid grid-rows-1 grid-cols-3 text-center gap-4'>
                <Link href='/live'>
                    <a className={router.asPath==='/home'?
                        'px-4 py-2 font-medium text-red-600 text-sm italic border-b-4 border-red-600':
                        'px-4 py-2 font-medium text-sm text-blue-900'}>
                        Live
                    </a>
                </Link>
                <Link href='/'>
                    <a className={router.asPath==='/'?
                        'px-4 py-2 font-medium text-red-600 text-sm italic border-b-4 border-red-600':
                        'px-4 py-2 font-medium text-sm text-blue-900'}>
                    {new Date().getDate()}-{new Date().toLocaleString('id-ID',{month:'short'})}
                    </a>
                </Link>
                <Link href='/besok'>
                    <a className={router.asPath==='/besok'?
                        'px-4 py-2 font-medium text-red-600 text-sm italic border-b-4 border-red-600':
                        'px-4 py-2 font-medium text-sm text-blue-900'}>
                    {new Date().getDate()+1}-{new Date().toLocaleString('id-ID',{month:'short'})}
                    </a>
                </Link>
            </div>
            <div className='text-right mr-4'>
                <a href='/' target='blank'>
                    <div className='rounded-lg bg-red-600 px-2 py-1'>
                        <h1 className='text-white font-semibold uppercase text-sm'>Daftar</h1>
                    </div>
                </a>
            </div>
        </header>
        </>
    )
}