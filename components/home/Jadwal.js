import Link from 'next/link'
import { useState } from "react"
import {BsBoxArrowUpRight,BsArrowsCollapse,BsArrowsExpand} from 'react-icons/bs'

const Jadwal = ({nama,game,alias}) => {
    const [open, setOpen] = useState(true)

    if(!game){
        return ''
    }

    return(
        <div>
            <div className='bg-red-600 py-2 px-4 sticky top-12 flex items-center border-b border-white cursor-pointer z-20' onClick={()=>setOpen(!open)}>
                <h1 className='capitalize text-xl font-bold w-full text-center'>
                    {nama}
                </h1>
                {open==false?<BsArrowsCollapse className='w-7 h-7 flex-none'/>:<BsArrowsExpand className='w-7 h-7 flex-none'/>}
            </div>
            {open==true?'':
            <div className={open==false?'block':'hidden'}>
            <div className='px-4 py-2 text-center'>
                <h1 className='capitalize font-bold text-lg'>
                    {alias}
                </h1>
            </div>
            {Object.values(game).map((item,index)=>(
                <div key={index} className='even:bg-gray-800 bg-gray-700'>
                    <div className='pt-2 pb-1 px-4 border-b border-white flex items-center'>
                        <h1 className='text-sm italic w-1/2 text-center'>
                        {item.start_ts==undefined?'':item.start_ts.slice(0,16)} WIB
                        </h1>
                        <Link href='/markets'>
                            <a className='uppercase font-semibold w-1/2 text-center text-sm'>
                            markets <sup><BsBoxArrowUpRight className='inline'/></sup>
                            </a>
                        </Link>
                    </div>
                    <div className='flex px-4 font-semibold items-center py-2'>
                        <div className={item.team2_name==undefined?'w-full text-center':'w-1/3'}>
                            <Link href={item.team1_name==undefined?'/':'/team/'+item.team1_name}>
                                <a>{item.team1_name}</a>
                            </Link>
                        </div>
                        {item.team2_name==undefined?'':
                        <div className='w-1/3 text-center'>
                            <h1>? : ?</h1>
                        </div>
                        }
                        {item.team2_name==undefined?'':
                        <div className='w-1/3 text-right'>
                            <Link href={item.team2_name==undefined?'/':'/team/'+item.team2_name}>
                                <a>{item.team2_name}</a>
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            ))}
            </div>
            }
        </div>
    )
}
export default Jadwal