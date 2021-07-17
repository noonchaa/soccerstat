import Head from 'next/head'
import Image from 'next/image'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = ({children,title,liga}) => {
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
        <Topbar liga={liga}/>
            <div className='flex relative z-20'>
                <div className='flex-none w-64 hidden lg:block self-start sticky top-0'>
                    <Sidebar liga={liga}/>
                </div>
                <div className='w-full z-40 bg-gray-900 pt-12'>
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/1200x150.jpg' width={1200} height={150} alt='ads'/>
                    </a>
                    {children}
                    <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/1200x150.jpg' width={1200} height={150} alt='ads'/>
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