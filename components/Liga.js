import Link from 'next/link'

const Liga = ({liga,regionId}) => {
    return(
        liga.map((item,index)=>(
            <Link href={regionId==undefined?'/':`/league/${regionId.toString()}`} key={index}>
                <a className='font-semibold'>
                    <div className='px-4 py-2 cursor-pointer hover:text-red-600' key={index}>
                    {item}
                    </div>
                </a>
            </Link>
        ))
    )
}
export default Liga