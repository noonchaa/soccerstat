import Head from 'next/head'
import MobileFootAds from '../ads/MobileFootAds'
import MobileTopAds from '../ads/MobileTopAds'
import Navbar from './Navbar'
import SideAds from '../ads/SideAds'
import Sidebar from './Sidebar'
import TabletTopAds from '../ads/TabletTopAds'
import Topbar from './Topbar'
import ToTop from './ToTop'

const Layout = ({title,desc,keyword,children,league,left,right,mtop,ttop,tmid,mfoot,link}) => {
    return(
    <div className='bg-gray-100'>
        <Head>
            <title>{title} | SoccerStat</title>
            <meta name='description'
            content={'Jadwal dan hasil pertandingan sepak bola lengkap dengan informasi pasaran taruhan '+desc}/>
            <meta name='keyword' content={'sepak bola, euro, piala dunia, liga, champions, inggris, serieA, la liga, '
             + keyword} />
        </Head>
        <main className='max-w-screen-2xl mx-auto flex justify-center'>
            <SideAds img={left} link={link}/>
            <div className='w-full'>
                <Navbar league={league}/>
                <MobileTopAds img={mtop} link={link}/>
                <TabletTopAds img={ttop} link={link}/>
                <div className='flex justify-center relative filter drop-shadow-md overflow-hidden'>
                    <Sidebar league={league} img={tmid} link={link}/>
                    <section className='w-full'>
                        <Topbar/>
                        {children}
                    </section>
                </div>
            </div>
            <SideAds img={right} link={link}/>
        </main>
        <ToTop/>
        <MobileFootAds img={mfoot} link={link}/>
        <footer className='max-w-screen-2xl mx-auto border-t border-gray-900 bg-gray-50 mt-14 md:mt-0'>
            <div className='mx-auto max-w-max'>
            <h1 className='text-base font-medium'>Soccer Stat @{new Date().getFullYear()}</h1>
            </div>
        </footer>
    </div>
    )
}
export default Layout