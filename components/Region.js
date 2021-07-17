import { useState } from "react"
import { useRouter } from "next/router"
import {BsArrowsCollapse,BsArrowsExpand} from 'react-icons/bs'

const Region = ({alias,children, regionId}) => {
    const router = useRouter()
    const [open,setOpen] = useState(false)

    return(
        <div>
            <div className={router.asPath=='/league/'+regionId?'px-4 py-2 flex font-bold text-xl items-center cursor-pointer bg-red-600':'px-4 py-2 flex font-bold text-xl items-center cursor-pointer'} onClick={()=>setOpen(!open)}>
                <h1 className='capitalize w-full'>{alias}</h1>
                {open==false?<BsArrowsCollapse className='w-7 h-7'/>:<BsArrowsExpand className='w-7 h-7'/>}
            </div>
            {open==false?'':
                children
            }
        </div>
    )
}
export default Region