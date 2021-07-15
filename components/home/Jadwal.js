import Link from 'next/link'

const Jadwal = ({nama,game}) => {

    if(!game){
        return ''
    }

    return(
        <div>
        <div className='text-center bg-red-600 py-2 sticky top-12'>
            <h1 className='capitalize text-xl font-bold'>
                {nama}
            </h1>
        </div>
        {Object.values(game).map((item,index)=>(
            <div key={index} className='even:bg-gray-800 bg-gray-700'>
                <div className='text-center pt-2 pb-1 border-b border-white'>
                    <h1 className='text-sm italic'>
                    {item.start_ts.slice(0,16)} WIB
                    </h1>
                </div>
                <div className='flex px-4 font-semibold items-center py-2'>
                    <div className='w-1/3'>
                        <Link href={'/team/'+item.team1_name.toLowerCase()}>
                            <a>{item.team1_name}</a>
                        </Link>
                    </div>
                    <div className='w-1/3 text-center'>
                        <h1>? : ?</h1>
                    </div>
                    <div className='w-1/3 text-right'>
                        <Link href={'/team/'+item.team2_name.toLowerCase()}>
                            <a>{item.team2_name}</a>
                        </Link>
                    </div>
                </div>
            </div>
        ))}
        </div>
    )
}
export default Jadwal