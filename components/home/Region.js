import { useState } from "react"
import {BsArrowsCollapse,BsArrowsExpand} from 'react-icons/bs'

const Region = ({alias,children}) => {
    const [open,setOpen] = useState(false)

    return(
        <div>
            <div className='flex font-bold text-xl items-center cursor-pointer' onClick={()=>setOpen(!open)}>
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