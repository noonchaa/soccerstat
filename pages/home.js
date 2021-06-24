import Navbar from '../components/home/Navbar'
import Image from 'next/image'
import League from '../components/home/League'
import BetSelector from '../components/home/BetSelector'
import MatchDate from '../components/home/MatchDate'
import MatchDetail from '../components/home/MatchDetail'
import { useState } from 'react'

const Home = () => {
    const fakeId = ['215456','564564','8548785','4545487']
    const [bet,setBet]=useState('1 x 2')
    return (
        <>
        <main className='max-w-screen-2xl mx-auto'>
            <Navbar/>
            <div className='bg-gray-200 flex justify-evenly py-2 fixed top-10 w-full md:pr-80 lg:hidden z-30'>
                <div onClick={()=>setBet('1 x 2')} >
                    <BetSelector opsi={bet}>1 x 2</BetSelector>
                </div>
                <div onClick={()=>setBet('hcap')} >
                    <BetSelector opsi={bet}>hcap</BetSelector>
                </div>
                <div onClick={()=>setBet('total')} >
                    <BetSelector opsi={bet}>total</BetSelector>
                </div>
                <div onClick={()=>setBet('lolos')} >
                    <BetSelector opsi={bet}>lolos</BetSelector>
                </div>
            </div>
            <div className='flex mt-20 relative z-20 min-h-screen lg:mt-14'>
                <div className='w-full bg-gray-50'>
                    <League title='EURO 2020 Final' number='7' />
                    <MatchDate date={'28 Jun - 23.00 WIB'} opsi={bet} />
                    {fakeId.map((item,index)=>(
                        <div key={index} className='even:bg-gray-100' >
                        <MatchDetail team1='England'team2='France' opsi={bet} >
                        </MatchDetail>
                        </div>
                    ))}
                </div>
                <div className='flex-none w-80 hidden md:block text-right -ml-5'>
                    <Image src='/ads-300x1050.png' width={300} height={1050} alt='advertisment'/>
                </div>
            </div>
        </main>
        <footer className='bg-gray-50' >
            footer
        </footer>
        </>
    )
}
export default Home