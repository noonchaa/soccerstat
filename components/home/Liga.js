import Link from 'next/link'

const Liga = ({liga,regionId}) => {
    return(
        Object.values(liga).map((item,index)=>(
            <div className='px-4 py-2 cursor-pointer' key={index}>
                <Link href={regionId==undefined?'/':`/league/${regionId.toString()}`}>
                    <a className='font-semibold'>{item.name}</a>
                </Link>
            </div>
        ))
    )
}
export default Liga