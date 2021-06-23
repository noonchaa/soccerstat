import {FaAngleDoubleUp} from 'react-icons/fa'

const ToTop = () => {
    const toTop = () => window.scrollTo({top:0,behavior:'smooth'})
    return(
    <FaAngleDoubleUp 
    className='w-8 h-8 text-black fixed bottom-5 right-5 lg:right-44 cursor-pointer animate-bounce z-40' 
    onClick={()=>toTop()}/>
    )
}
export default ToTop