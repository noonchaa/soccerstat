import Head from 'next/head'
import { useEffect, useState } from 'react'
import AdsImage from './AdsImage'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = ({children,title,liga}) => {
    const [show,setShow] = useState(false)

    useEffect(()=>{
        
        setTimeout(()=>{
            setShow(true)
        },5000)
    },[])
    
    return(
        <>
        <Head>
            <title>Planet Football {title}</title>
            <meta name='description' content='Planet Football UEFA Champions League Premier League La Liga Serie A Bundesliga Ligue 1 Eredivisie Liga NOS FIFA World Cup EURO EFL Championship Campeonato Brasileiro Série A Copa Libertadores Planet Football'/>
            <meta name='keywords' content='Planet Football, UEFA Champions League, Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie, Liga NOS, FIFA World Cup, EURO, EFL Championship, Campeonato Brasileiro Série A, Copa Libertadores'/>
            <meta name="author" content="Suyono"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel='icon' href='/favicon.ico'/>
        </Head>
        <main>
            <div className={show==false?'hidden':'fixed top-12 w-full mx-auto z-50 max-w-screen-2xl h-screen bg-black bg-opacity-75 overscroll-none flex items-center'}>
                <div className='relative mx-auto w-full lg:max-w-3xl'>
                    <div className='absolute right-2 cursor-pointer'>
                    <h1 className='font-medium text-2xl' onClick={()=>setShow(!show)}>X</h1>
                    </div>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <img src='/pop.jpg' width='100%' height='auto' alt='ads'/>
                    </a>
                </div>
            </div>
        <Topbar liga={liga}/>
            <div className='flex relative z-20'>
                <div className='flex-none w-64 hidden lg:block self-start sticky top-0'>
                    <Sidebar liga={liga}/>
                </div>
                <div className='w-full z-40 bg-gray-900 pt-12'>
                    <AdsImage gb1='top1.gif' gb2='top2.jpg' wd={1200} tg={150}/>
                    <div className='relative z-20 bg-gray-900'>
                    {children}
                    </div>
                    <AdsImage gb1='bot1.jpg' gb2='bot2.jpg' wd={1200} tg={150}/>
                    <footer className='text-center border-t border-white py-4 bg-gray-900'>
                        <h1 className='text-sm font-semibold italic'>
                            Planet Football<span> @{new Date().getFullYear()}</span>
                        </h1>
                    </footer>
                </div>
                <div className='flex-none w-40 hidden md:block self-start sticky top-12'>
                    <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-40'>
                        <AdsImage gb1='right1.jpg' gb2='right2.png' wd={160} tg={600}/>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
export default Layout