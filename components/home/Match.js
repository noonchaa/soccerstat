import Link from 'next/link'

const Match = ({home, away, score1, score2, dateStart, homeId, awayId, live}) => {
    const options = {weekday:'long',day:'numeric',month:'long',hour:'numeric',minute:'numeric'}

    return (
        <div className='even:bg-gray-800 bg-gray-700'>
        <div className='text-center pt-2 pb-1 border-b border-white'>
            <h1 className='text-sm italic'>
            {live=='IN_PLAY'||live=='PAUSED'?<span className='text-green-500 font-bold animate-pulse'>LIVE</span>:''} {new Date(dateStart).toLocaleString('id',options)} WIB
            </h1>
        </div>
        <div className='flex px-4 font-semibold items-center py-2'>
            <div className='w-1/3'>
                <Link href={homeId===null?'/':'/team/'+homeId}>
                    <a>{home===null?'TBD':home}</a>
                </Link>
            </div>
            <div className='w-1/3 text-center'>
                <h1>{score1===null?'?':score1}  :  {score2===null?'?':score2}</h1>
            </div>
            <div className='w-1/3 text-right'>
                <Link href={awayId===null?'/':'/team/'+awayId}>
                    <a>{away===null?'TBD':away}</a>
                </Link>
            </div>
        </div>
        </div>
    )
}
export default Match