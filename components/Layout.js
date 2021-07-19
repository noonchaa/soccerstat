import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = ({children,title,liga}) => {
    const [show,setShow] = useState(false)
    const [ads,setAds] = useState(false)
    const [timer,setTimer] = useState(0)
    const listAds = ['1.gif','2.jpg','3.gif','4.jpg','5.gif','6.png','7.jpg','8.png','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.png','17.jpg','18.gif','19.jpg','20.jpg']
    const showAds = listAds[timer]

    useEffect(()=>{
        
        setTimeout(()=>{
            setShow(true)
        },5000)
    },[])

    useEffect(()=>{
        const timer = setInterval(()=>setAds(!ads),6000)
        return () => {
            clearInterval(timer)
        }
    },[ads])

    useEffect(()=>{
        const adsChange = setInterval(()=>{
            timer >= 19 ? setTimer(0) : setTimer(timer+1)
        },5000)
        return () => {
            clearInterval(adsChange)
        }
    },[timer])
    
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
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                        <div  className='sticky top-12 z-0'>
                            <Image src={'/728/'+showAds} width={1200} height={150} alt='ads'/>
                        </div>
                    </a>
                    <div className='relative z-20 bg-gray-900'>
                    {children}
                    </div>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src={'/728/'+showAds} width={1200} height={150} alt='ads'/>
                    </a>
                    <footer className='text-center border-t border-white py-4 bg-gray-900'>
                        <h1 className='text-sm font-semibold italic'>
                            Planet Football<span> @{new Date().getFullYear()}</span>
                        </h1>
                    </footer>
                </div>
                <div className='flex-none w-40 hidden md:block self-start sticky top-12'>
                    <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-40'>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/160x600.jpg' width={160} height={600} alt='ads'/>
                    </a>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
export default Layout