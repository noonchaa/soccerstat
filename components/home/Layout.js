import Head from 'next/head'
import Image from 'next/image'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children,title,desc,keyw}) => {
    const league = [
        {
            id: 2001,
            name: "UEFA Champions League"
        },
        {
            id: 2021,
            name: "Premier League"
        },
        {
            id: 2014,
            name: "La Liga"
        },
        {
            id: 2019,
            name: "Serie A"
        },
        {
            id: 2002,
            name: "Bundesliga"
        },
        {
            id: 2015,
            name: "Ligue 1"
        },
        {
            id: 2003,
            name: "Eredivisie"
        },
        {
            id: 2017,
            name: "Liga NOS"
        },
        {
            id: 2000,
            name: "FIFA World Cup"
        },
        {
            id: 2018,
            name: "European Championship"
        },
        {
            id: 2016,
            name: "EFL Championship"
        },
        {
            id: 2013,
            name: "Campeonato Brasileiro Série A"
        },
        {
            id: 2152,
            name: "Copa Libertadores"
        },
    ]
    return(
        <>
        <Head>
            <title>Planet Football {title}</title>
            <meta name='description' content={'Planet Football '+desc}/>
            <meta name='keywords' content={'Planet Football, '+keyw}/>
            <meta name="author" content="Suyono"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel='icon' href='/favicon.ico'/>
        </Head>
        <Navbar team={league}/>
        <main className='mt-12 mb-4'>
            <div className='flex relative z-20'>
                <div className='flex-none w-64 hidden lg:block self-start sticky top-12'>
                    <Sidebar team={league}/>
                </div>
                <div className='w-full z-40 bg-gray-900 min-h-screen'>
                    {children}
                </div>
                <div className='flex-none w-40 hidden md:block self-start sticky top-12'>
                    <Image src='/ads-160x600.png' width={160} height={600} alt='ads'/>
                </div>
            </div>
        </main>
        <footer className='text-center border-t border-white py-4 bg-gray-900'>
            <h1 className='text-sm font-semibold italic'>Planet Football<span> @{new Date().getFullYear()}</span></h1>
        </footer>
        </>
    )
}
export default Layout