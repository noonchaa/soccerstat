import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useEffect, useState } from 'react'
import Region from './Region'
import Liga from './Liga'
import { useRouter } from 'next/router'
import Slide from './Slide'

const Topbar = ({liga}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const show = 'transition duration-100 transform translate-y-0 lg:hidden z-50 w-full md:w-64 fixed top-0 overflow-y-auto overscroll-none bg-gray-900 h-screen'
    const hide = 'transition duration-100 transform -translate-y-full lg:hidden z-50 w-full md:w-64 fixed top-0 overflow-y-auto overscroll-none bg-gray-900 h-screen'

    useEffect(()=>{
        setOpen(false)
    },[router.asPath])

    const Menu = () => {
        return(
            <div className={open==false?hide:show}>
                <div className='px-4 py-2 flex justify-between items-center cursor-pointer sticky top-0 bg-gray-900 z-40'>
                    <MdClose className='w-8 h-8 flex-none lg:hidden' onClick={()=>setOpen(!open)}/>
                    <div className='w-full text-center'>
                        <Link href='/'>
                            <a className='font-bold italic text-2xl'>Planet Football</a>
                        </Link>
                    </div>
                </div>

                <div className='w-full text-center'>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/300x250.png' width={300} height={250} alt='advertisement' className='mx-auto'/>
                    </a>
                </div>

                <div className='md:hidden p-4 text-center animate-pulse'>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank' className='rounded-xl bg-red-600 font-bold uppercase text-xl px-4 py-2'>
                        bonus deposit 200%
                    </a>
                </div>

                <div className='flex flex-col'>
                    {liga==undefined||liga==null?'':
                    liga.map((item,index)=>(
                        <div key={index} className='even:bg-gray-800 bg-gray-900'>
                            <Region alias={item.alias} regionId={item.id}>
                                <Liga liga={item.liga} regionId={item.id}/>
                            </Region>
                        </div>
                    ))
                    }
                </div>
                
                <div className='w-full text-center'>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/250x350.jpg' width={250} height={350} alt='advertisment' className='mx-auto'/>
                    </a>
                </div>

            </div>
        )
    }

    return (
        <>
        <header className='flex justify-between items-center bg-gray-900 fixed top-0 w-full max-w-screen-2xl z-40 border-b border-white'>
            <div className='px-4 py-2 flex items-center cursor-pointer flex-none w-full md:w-64'>
                <FaBars className='w-8 h-8 flex-none lg:hidden' onClick={()=>setOpen(!open)}/>
                <div className='w-full text-center'>
                <Link href='/'>
                    <a className='font-bold italic text-2xl'>Planet Football</a>
                </Link>
                </div>
            </div>
            <Slide/>
            <div className='hidden md:block md:flex-none w-40 md:text-center'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank' className='rounded-lg bg-red-600 font-semibold uppercase text-sm px-2 py-1'>
                    Register Now
                </a>
            </div>
        </header>
        <Menu/>
        </>
    )
}
export default Topbar