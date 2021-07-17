import { useState } from "react"
import { useRouter } from "next/router"
import {BsArrowsCollapse,BsArrowsExpand} from 'react-icons/bs'

const Region = ({alias,children, regionId}) => {
    const router = useRouter()
    const [open,setOpen] = useState(false)

    return(
        <div>
            <div className={router.asPath=='/league/'+regionId?'px-4 py-2 flex font-bold text-xl items-center cursor-pointer bg-black':'px-4 py-2 flex font-bold text-xl items-center cursor-pointer'} onClick={()=>setOpen(!open)}>
                <h1 className='capitalize w-full hover:text-red-600'>{alias}</h1>
                {open==false?<BsArrowsCollapse className='w-7 h-7'/>:<BsArrowsExpand className='w-7 h-7 text-red-600'/>}
            </div>
            {open==false?'':
                children
            }
        </div>
    )
}
export default Region