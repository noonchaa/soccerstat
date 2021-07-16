import Layout from "../components/home/Layout"
import {useRouter} from 'next/router'
import { useEffect } from "react"

const NotFound = () => {
    const router = useRouter()

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },3000)
    },[])

    return(
        <Layout>
            <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto'>
                <img src='/logo.svg' alt='logo' width='100%' height='auto' className='animate-pulse'/>
                <h1 className='text-center text-2xl py-4 font-bold'>Page Not Found</h1>
                <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
            </div>
        </Layout>
    )
}
export default NotFound