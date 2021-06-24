import { useState } from "react"
import MatchHalf from "./MatchHalf"
import OneBet from "./OneBet"
import TwoBet from "./TwoBet"
import {IoIosArrowDown,IoIosArrowUp} from 'react-icons/io'

const MatchDetail = ({team1,team2,opsi}) => {
    const [open,setOpen]=useState(false)
    return(
        <>
        <div className='flex border-gray-300 border-b justify-between items-center' onClick={()=>setOpen(!open)}>
            <div className='flex items-center'>
                <div className='bg-gray-300 flex-none text-center py-4 w-6'>
                    {open==false?<IoIosArrowDown className='w-6 h-6'/>:<IoIosArrowUp className='w-6 h-6'/>}
                </div>
                <div className='px-2 py-1'>
                    <h1 className='text-xs font-semibold pb-2'>{team1}</h1>
                    <h1 className='text-xs font-semibold'>{team2}</h1>
                </div>
            </div>
            <div className='lg:hidden'>
                <div className={opsi=='1 x 2'?'flex justify-between':'hidden'}>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                </div>
                <div className={opsi=='hcap'?'flex justify-between':'hidden'}>
                    <TwoBet satu='-1.5' dua='2.45' />
                    <TwoBet satu='1.5' dua='3.45' />
                </div>
                <div className={opsi=='total'?'flex justify-between':'hidden'}>
                    <TwoBet satu='-1.5' dua='2.45' />
                    <TwoBet satu='1.5' dua='3.45' />
                </div>
                <div className={opsi=='lolos'?'flex justify-between':'hidden'}>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                </div>
            </div>
            <div className='hidden lg:flex justify-between'>
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
                <TwoBet satu='-1.5' dua='2.45' />
                <TwoBet satu='1.5' dua='3.45' />
                <TwoBet satu='-1.5' dua='2.45' />
                <TwoBet satu='1.5' dua='3.45' />
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
            </div>
        </div>
        <div className={open==false?'hidden':'block'}>
            <MatchHalf opsi={opsi} >Babak Pertama</MatchHalf>
            <MatchHalf opsi={opsi} >Babak Kedua</MatchHalf>
        </div>
        </>
    )
}
export default MatchDetail