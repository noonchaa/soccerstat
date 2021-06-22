import Head from 'next/head'
import Image from 'next/image'

const Layout = ({title,desc,keyword,children}) => {
    return(
    <div className='bg-gray-100'>
        <Head>
            <title>{title} | SoccerStat</title>
            <meta name='description' content={desc}/>
            <meta name='keyword' content={'sepak bola, euro, piala dunia, liga, champions, inggris, serieA, la liga, '
             + keyword} />
        </Head>
        <main className='max-w-screen-2xl mx-auto'>
            <div className='flex justify-center'>
                <section className='w-40 flex-none hidden lg:block self-start sticky top-0'>
                    <Image src='/sk-left.jpg' width={160} height={600} alt='advertisment'/>
                </section>
                <div className='w-full'>
                    <section className='bg-gray-200 w-full md:hidden sticky top-0 z-0'>
                        <Image src='/top.jpg' layout='responsive' width={320} height={50} alt='advertisment'/>
                    </section>
                    <section className='bg-gray-200 w-full hidden md:block sticky top-0 z-0'>
                        <Image src='/top.jpg' layout='responsive' width={728} height={90} alt='advertisment'/>
                    </section>
                    {children}
                </div>
                <section className='w-40 flex-none hidden lg:block self-start sticky top-0'>
                    <Image src='/sk-right.jpg' width={160} height={600} alt='advertisment'/>
                </section>
            </div>
        </main>
        <footer></footer>
    </div>
    )
}
export default Layout