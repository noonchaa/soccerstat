import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function Navbar({team}){
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const sidePath = [
        {
            ref:'/',
            date: 'All Matchs'
        },
        {
            ref:'/#kemarin',
            date: new Date().setDate(new Date().getDate()-1)
        },
        {
            ref:'/#sekarang',
            date: new Date()
        },
        {
            ref:'/#besok',
            date: new Date().setDate(new Date().getDate()+1)
        }
    ]

    return(
        <>
        <div className={open==false?
        'transition duration-100 transform -translate-y-full lg:hidden z-50 w-full md:w-64 fixed top-0 overflow-y-auto overscroll-none bg-gray-900 h-screen'
        :
        'transition duration-100 transform translate-y-0 lg:hidden z-50 w-full md:w-64 fixed top-0 overflow-y-auto overscroll-none bg-gray-900 h-screen'}>
        <div className='px-4 py-2 flex justify-between items-center cursor-pointer sticky top-0 bg-gray-900 z-40'>
            <MdClose className='w-8 h-8 flex-none lg:hidden' onClick={()=>setOpen(!open)}/>
            <div className='w-full text-center'>
                <Link href='/'>
                    <a className='font-bold italic text-2xl'>Planet Football</a>
                </Link>
            </div>
        </div>
        <div className='md:hidden bg-white flex py-4 animate-pulse'>
            <a href='/' target='blank' className='font-bold w-full text-center uppercase text-xl text-red-600'>
                bonus deposit 200%
            </a>
        </div>
        <div className='w-full text-center py-4'>
            <Image src='/ads-300x250.png' width={300} height={250} alt='advertisement' className='mx-auto'/>
        </div>
        <h1 className='text-center text-red-600 text-xl capitalize font-bold border-b border-white py-4 md:hidden'>
            Jadwal
        </h1>
        <div className='flex flex-col md:hidden' onClick={()=>setOpen(!open)}>
            {sidePath.map((item,index)=>(
            <Link href={item.ref} key={index}>
            <a className={router.asPath===item.ref?
                'px-4 py-2 font-medium italic bg-red-600 text-center':
                'pl-4 py-2 font-medium'}>
            {item.date==='All Matchs'?item.date:new Date(item.date).toLocaleDateString('id',{weekday:'long',day:'2-digit',month:'long'})}
            </a>
            </Link>
            ))}
        </div>
        <h1 className='text-center text-red-600 text-xl capitalize font-bold border-b border-white pt-8 pb-4'>
            daftar liga
        </h1>
        <div className='flex flex-col'>
            {team.map((item,index)=>(
            <Link href={'/league/'+item.id} key={index}>
                <a className={router.asPath==='/league/'+item.id?
                    'px-4 py-2 font-medium italic bg-red-600 text-center':
                    'pl-4 py-2 font-medium'}>
                    {item.name}
                </a>
            </Link>
            ))}
        </div>
        <div className='w-full text-center py-8'>
            <Image src='/ads-300x600.png' width={300} height={600} alt='advertisment' className='mx-auto'/>
        </div>
        </div>

        <header className='flex justify-between items-center bg-gray-900 fixed top-0 w-full max-w-screen-2xl z-40'>
            <div className='px-4 py-2 flex items-center cursor-pointer flex-none w-full md:w-64'>
                <FaBars className='w-8 h-8 flex-none lg:hidden' onClick={()=>setOpen(!open)}/>
                <div className='w-full text-center'>
                <Link href='/'>
                    <a className='font-bold italic text-2xl'>Planet Football</a>
                </Link>
                </div>
            </div>
            <div className='hidden md:grid grid-rows-1 grid-cols-4 text-center gap-4'>
                {sidePath.map((item,index)=>(
                <Link href={item.ref} key={index}>
                <a className={router.asPath===item.ref?
                    'px-4 py-2 font-medium text-red-600 text-sm italic border-b-4 border-red-600':
                    'px-4 py-2 font-medium text-sm'}>
                {item.date==='All Matchs'?item.date:new Date(item.date).toLocaleDateString('id',{weekday:'long',day:'2-digit',month:'long'})}
                </a>
                </Link>
                ))}
            </div>
            <div className='hidden md:block md:flex-none w-40 md:text-center'>
                <a href='/' target='blank' className='rounded-lg bg-red-600 font-semibold uppercase text-sm px-2 py-1'>
                    deposit + 200%
                </a>
            </div>
        </header>
        </>
    )
}