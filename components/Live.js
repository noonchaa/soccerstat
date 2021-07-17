import Link from 'next/link'

const Live = ({game}) => {

    if(!game){
        return ''
    }

    return(
        <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 2xl:grid-cols-5'>
        {Object.values(game).map((item,index)=>(
        <div className='bg-gray-700 even:bg-gray-800 border-red-600 border-opacity-0 border-2 hover:border-opacity-100' key={index}>
        <Link href={`/match/?id=${item.id}&team1=${item.team1_name}&team2=${item.team2_name}`}>
            <a>
                <div className='p-4 border-r border-gray-600'>
                    <h1 className='mb-2 font-semibold italic text-center bg-gray-900 -m-4'>{new Date(item.start_ts).toLocaleString('id',{day:'2-digit',month:'short',hour:'2-digit',minute:'numeric'})} WIB</h1>
                    <h1 className='mb-2 font-bold'>{item.team1_name}</h1>
                    <h1 className='font-bold'>{item.team2_name}</h1>
                </div>
            </a>
        </Link>
        </div>
        ))}
        </div>
    )
}
export default Live