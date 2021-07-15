import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function Navbar({team}){
    const [open, setOpen] = useState(false)
    const router = useRouter()

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
            <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='blank' className='font-bold w-full text-center uppercase text-xl text-red-600'>
                bonus deposit 200%
            </a>
        </div>
        <div className='w-full text-center py-4'>
            <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375'>
            <Image src='/300x250.png' width={300} height={250} alt='advertisement' className='mx-auto'/>
            </a>
        </div>
        <div className='flex flex-col border-b border-t border-white'>
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
            <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375'>
            <Image src='/250x350.jpg' width={250} height={350} alt='advertisment' className='mx-auto'/>
            </a>
        </div>
        </div>

        <header className='flex justify-between items-center bg-gray-900 fixed top-0 w-full max-w-screen-2xl z-40 border-b border-white'>
            <div className='px-4 py-2 flex items-center cursor-pointer flex-none w-full md:w-64'>
                <FaBars className='w-8 h-8 flex-none lg:hidden' onClick={()=>setOpen(!open)}/>
                <div className='w-full text-center'>
                <Link href='/'>
                    <a className='font-bold italic text-2xl'>Planet Football</a>
                </Link>
                </div>
            </div>
            <div className='hidden md:block md:flex-none w-40 md:text-center'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='blank' className='rounded-lg bg-red-600 font-semibold uppercase text-sm px-2 py-1'>
                    deposit + 200%
                </a>
            </div>
        </header>
        </>
    )
}