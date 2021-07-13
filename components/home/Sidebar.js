import Image from 'next/image'
import {useRouter} from 'next/router'
import Link from 'next/link'

const Sidebar = ({team}) => {
    const router = useRouter()

    return(
        <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-72'>
            <div className='bg-white flex py-4 animate-pulse w-64'>
                <a href='/' target='blank' className='font-bold w-full text-center uppercase text-xl text-red-600'>
                    bonus deposit 200%
                </a>
            </div>
            <div className='w-64 text-center py-4'>
                <Image src='/ads-200x200.png' width={200} height={200} alt='advertisement' className='mx-auto'/>
            </div>
            <div className='flex flex-col w-64 border-b border-t border-white'>
                {team.map((item,index)=>(
                <Link href={'/league/'+item.id} key={index}>
                    <a className={router.asPath==='/league/'+item.id?
                        'px-4 py-2 font-medium italic bg-red-600 text-center':
                        'px-4 py-2 font-medium'}>
                        {item.name}
                    </a>
                </Link>
                ))}
            </div>
            <div className='w-64 text-center px-2 py-8'>
                <Image src='/ads-240x400.png' width={240} height={400} alt='advertisment'/>
            </div>
        </div>
    )
}
export default Sidebar