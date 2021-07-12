import { useState } from "react"
import {BsChevronDown} from'react-icons/bs'

const Match = ({home, away, score1, score2, dateStart, homeId, awayId}) => {
    const options = {weekday:'long',day:'numeric',month:'long',hour:'numeric',minute:'numeric'}
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [team, setTeam] = useState([])
    const [squad, setSquad] = useState([])
    const [comp, setComp] = useState([])
    const [negara, setNegara] = useState({name:''})

    const getTeam = async (teamId) => {
        const res = await fetch(`/api/team/?query=${teamId}`)
        const data = await res.json()
        setTeam(data)
        setSquad(data.squad)
        setComp(data.activeCompetitions)
        setNegara(data.area)
    }
    const clickHome = () => {
        setShow(!show)
        getTeam(homeId)
    }
    const clickAway = () => {
        setShow(!show)
        getTeam(awayId)
    }
    const Manager = squad.filter(item=>item.role==='COACH')
    const Assistant = squad.filter(item=>item.role==='ASSISTANT_COACH')
    const Pemain = squad.filter(item=>item.role==='PLAYER')

    return (
        <div className='even:bg-gray-800 bg-gray-700'>
        <div className='text-center'>
            <h1 className='text-sm'>
                {new Date(dateStart).toLocaleString('id',options)} WIB
            </h1>
        </div>
        <div className='grid grid-cols-3 py-1 text-center px-4 font-bold'>
            <div className='text-left' >
                <h1>{home}</h1>
            </div>
            <div>
                <h1>{score1===null?'?':score1}  :  {score2===null?'?':score2}</h1>
            </div>
            <div className='text-right'>
                <h1>{away}</h1>
            </div>
        </div>
        <div className='grid grid-cols-2 cursor-pointer'>
            <div className={show===false?'pl-8':'hidden'} onClick={()=>clickHome()}>
            <BsChevronDown className='h-6 w-6'/>
            </div>
            <div className={show===false?'pr-8':'hidden'} onClick={()=>clickAway()}>
            <BsChevronDown className='h-6 w-6 ml-auto'/>
            </div>
        </div>
        {
            show===false?
            '':
            <div className='p-4 border-t border-white font-semibold'>
                <div className='grid grid-cols-3 break-words cursor-pointer' onClick={()=>setShow(!show)}>
                <h1 className='col-span-3 text-center'>
                    {team.crestUrl===null?'':<img src={team.crestUrl} alt='badge' width='100' height='100' className='inline'/>}
                </h1>
                <h1 className='col-span-1'>Nama</h1>
                <h1 className='col-span-2'>: {team.shortName}</h1>
                <h1 className='col-span-1'>Tahun</h1>
                <h1 className='col-span-2'>: {team.founded}</h1>
                <h1 className='col-span-1'>Nama Singkat</h1>
                <h1 className='col-span-2'>: {team.tla}</h1>
                <h1 className='col-span-1'>Partisipasi</h1>
                <h1 className='col-span-2'>: {comp.map((item,index)=>(<span key={index}>{item.name}, </span>))}</h1>
                <h1 className='col-span-1'>Negara</h1>
                <h1 className='col-span-2'>: {negara.name}</h1>
                <h1 className='col-span-1'>Stadion</h1>
                <h1 className='col-span-2'>: {team.venue}</h1>
                <h1 className='col-span-1'>Alamat</h1>
                <h1 className='col-span-2'>: {team.address}</h1>
                <h1 className='col-span-1'>Telpon</h1>
                <h1 className='col-span-2'>: {team.phone}</h1>
                <h1 className='col-span-1'>Email</h1>
                <h1 className='col-span-2'>: {team.email}</h1>
                <h1 className='col-span-1'>Website</h1>
                <h1 className='col-span-2'>: {team.website}</h1>
                </div>
                {Manager.map((item,index)=>(
                    <div key={index}>
                        <h1 className='text-center pt-4' >Pelatih</h1>
                        <h1 className='text-center pt-2'>Manager : {item.name} - {item.nationality}</h1>
                    </div>
                ))}
                {Assistant.map((item,index)=>(
                    <div key={index}>
                        <h1 className='text-center pt-2'>Assisten : {item.name} - {item.nationality}</h1>
                    </div>
                ))}
                {
                    !squad.length?'':
                    <div>
                    <h1 className='text-center p-4 cursor-pointer' onClick={()=>setOpen(!open)}><BsChevronDown className='inline'/> Squad <BsChevronDown className='inline'/></h1>
                    {Pemain.map((item,index)=>(
                        <div key={index} className={open===false?'hidden':'pb-4 grid grid-cols-3 cursor-pointer'} onClick={()=>setOpen(!open)}>
                            <h1 className='col-span-1'>Nama</h1>
                            <h1 className='col-span-2'>: {item.name}</h1>
                            <h1 className='col-span-1'>Usia</h1>
                            <h1 className='col-span-2'>: {item.dateOfBirth===null?'':new Date().getFullYear()-Number(item.dateOfBirth.slice(0,4))+' Tahun'}</h1>
                            <h1 className='col-span-1'>Posisi</h1>
                            <h1 className='col-span-2'>: {item.position}</h1>
                            <h1 className='col-span-1'>Negara</h1>
                            <h1 className='col-span-2'>: {item.nationality}</h1>
                            <h1 className='col-span-1'>Nomor</h1>
                            <h1 className='col-span-2'>: {item.shirtNumber}</h1>
                        </div>
                    ))}
                    </div>
                }
            </div>
        }
        </div>
    )
}
export default Match