import {VscLoading} from 'react-icons/vsc'

export default function Loading() {
    return(
        <div className='w-full my-14 mx-auto flex justify-center'>
        <VscLoading className='animate-spin w-32 h-32 text-green-600'/>
        </div>
    )
}