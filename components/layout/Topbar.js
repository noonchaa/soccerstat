import Link from 'next/link'
import {useRouter} from 'next/router'

const Topbar = () => {
    const router = useRouter()
    return(
        <section className='bg-gray-50 filter drop-shadow-lg py-2 border-green-600 border-b'>
            <div className='flex justify-around items-center' >
                <div className={router.pathname==='/live'?'bg-green-600 text-white px-3 rounded-lg':''}>
                <Link href='/live'>
                    <a className='text-base font-semibold capitalize cursor-pointer'>
                        Live
                    </a>
                </Link>
                </div>
                <div className={router.pathname==='/'?'bg-green-600 text-white px-3 rounded-lg':''}>
                <Link href='/'>
                    <a className='text-base font-semibold capitalize cursor-pointer'>
                        Hari ini
                    </a>
                </Link>
                </div>
                <div className={router.pathname==='/besok'?'bg-green-600 text-white px-3 rounded-lg':''}>
                <Link href='/besok'>
                    <a className='text-base font-semibold capitalize cursor-pointer'>
                        besok
                    </a>
                </Link>
                </div>
            </div>
        </section>
    )
}
export default Topbar