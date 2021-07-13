import {SoccerKey} from '../../lib/socerApi'
import {useRouter} from 'next/router'
import Layout from '../../components/home/Layout'

export const getStaticPaths = async () => {
    const nextWeek = new Date().setDate(new Date().getDate()+10)
    const res = await fetch(`https://api.football-data.org/v2/matches?dateFrom=${new Date().toISOString().substring(0,10)}&&dateTo=${new Date(nextWeek).toISOString().substring(0,10)}`,{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    const data = await res.json()
    const awayId = data.matches.map(item=>item.awayTeam.id)
    const homeId = data.matches.map(item=>item.homeTeam.id)
    const teamId = awayId.concat(homeId).filter(item=>item!=null)
    const paths = teamId.map((item) => ({
      params: { id: item.toString() },
    }))
    return{paths, fallback:true}
}
export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.football-data.org/v2/teams/${Number(params.id)}`,{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    if(res.status===429){
        return {
            props: {
                team: null
            },
            revalidate:10
        }
    } else {
        const data = await res.json()
        return {
            props: {
                team: data
            },
            revalidate:10
        }
    }
}

const Team = ({team}) => {
    const router = useRouter()

    if(router.isFallback||team==null){
        return(
            <Layout>
            <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto mt-32'>
                <img src='/goal.svg' alt='logo' width='100%' height='auto'/>
                <h1 className='text-center text-2xl py-4 animate-pulse text-red-500 font-bold'>Maintenance Server</h1>
                <h1 className='text-center text-xl font-semibold'>Silahkan Pilih Halaman Lain</h1>
            </div>
            </Layout>
        )
    }
    
    const {activeCompetitions,address,area,crestUrl,email,founded,phone,name,squad,tla,venue,website} = team

    return(
        <Layout title={name} desc={activeCompetitions.map(item=>item.name)+' '+activeCompetitions.map(item=>item.area.name)+' '+area.name+' '+tla+' '+venue} keyw={activeCompetitions.map(item=>item.name)+', '+activeCompetitions.map(item=>item.area.name)+', '+area.name+', '+tla+', '+venue}>
            <div className='flex flex-col md:flex-row p-4 md:items-center'>
                <div className='w-full md:w-1/3 pb-4'>
                    {crestUrl==null||crestUrl==''||crestUrl==undefined?
                    <div>
                        <img src='/notfound.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Logo Tidak Ditemukan</h1>
                    </div>
                    :
                    <div>
                        <img src={crestUrl} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
                <div className='md:pl-4 grid grid-cols-3 break-words md:w-2/3 self-start'>
                    <h1 className='col-span-1 border border-white px-2'>Nama</h1>
                    <h1 className='col-span-2 border border-white px-2'>{name}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Tahun</h1>
                    <h1 className='col-span-2 border border-white px-2'>{founded}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Nama Singkat</h1>
                    <h1 className='col-span-2 border border-white px-2'>{tla}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Liga</h1>
                    <div className='col-span-2 border border-white px-2'>
                    {!activeCompetitions.length?
                    <h1></h1>
                    :
                    activeCompetitions.map((item,index)=>(
                        <h1 key={index}>{item.name}</h1>
                    ))}
                    </div>
                    <h1 className='col-span-1 border border-white px-2'>Negara</h1>
                    <h1 className='col-span-2 border border-white px-2'>{area.name}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Stadion</h1>
                    <h1 className='col-span-2 border border-white px-2'>{venue}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Alamat</h1>
                    <h1 className='col-span-2 border border-white px-2'>{address}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Telpon</h1>
                    <h1 className='col-span-2 border border-white px-2'>{phone}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Email</h1>
                    <h1 className='col-span-2 border border-white px-2'>{email}</h1>
                    <h1 className='col-span-1 border border-white px-2'>Website</h1>
                    <h1 className='col-span-2 border border-white px-2'>{website}</h1>
                </div>
            </div>

            <h1 className='pl-4 pb-2 pt-4 font-bold text-xl'>Pelatih :</h1>
            {!squad.filter(item=>item.role=='COACH').length?
            <h1 className='pl-6 pb-2 font-semibold'>Sorry data pelatih tidak ditemukan</h1>
            :
            squad.filter(item=>item.role=='COACH').map((item,index)=>(
                <div key={index} className='grid grid-cols-3 break-words gap-y-1'>
                    <h1 className='col-span-1'>Nama</h1>
                    <h1 className='col-span-2'>: {item.name}</h1>
                    <h1 className='col-span-1'>Jabatan</h1>
                    <h1 className='col-span-2'>: Pelatih Utama</h1>
                    <h1 className='col-span-1'>Negara</h1>
                    <h1 className='col-span-2'>: {item.nationality}</h1>
                    <h1 className='col-span-1'>Umur</h1>
                    <h1 className='col-span-2'>: {item.dateOfBirth===null?'':new Date().getFullYear()-Number(item.dateOfBirth.slice(0,4))+' Tahun'}</h1>
                </div>
            ))}
            {!squad.filter(item=>item.role=='ASSISTANT_COACH').length?
            ''
            :
            squad.filter(item=>item.role=='ASSISTANT_COACH').map((item,index)=>(
                <div key={index} className='grid grid-cols-3 break-words gap-y-1'>
                    <h1 className='col-span-1'>Nama</h1>
                    <h1 className='col-span-2'>: {item.name}</h1>
                    <h1 className='col-span-1'>Jabatan</h1>
                    <h1 className='col-span-2'>: Assisten Pelatih</h1>
                    <h1 className='col-span-1'>Negara</h1>
                    <h1 className='col-span-2'>: {item.nationality}</h1>
                    <h1 className='col-span-1'>Umur</h1>
                    <h1 className='col-span-2'>: {item.dateOfBirth===null?'':new Date().getFullYear()-Number(item.dateOfBirth.slice(0,4))+' Tahun'}</h1>
                </div>
            ))}

            <h1 className='pl-4 pb-2 pt-4 font-bold text-xl'>Squad :</h1>
            {!squad.filter(item=>item.role!='ASSISTANT_COACH').filter(item=>item.role!='COACH').length?
            <h1 className='pl-6 pb-2 font-semibold'>Sorry data pemain tidak ditemukan</h1>
            :
            <div className='px-6 font-semibold grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4'>
            {squad.filter(item=>item.role!='ASSISTANT_COACH').filter(item=>item.role!='COACH').map((item,index)=>(
                <div className='grid grid-cols-3 break-words' key={index}>
                <h1 className='col-span-1 border border-white pl-2'>Nama</h1>
                <h1 className='col-span-2 border border-white pl-2'>{item.name}</h1>
                <h1 className='col-span-1 border border-white pl-2'>Posisi</h1>
                <h1 className='col-span-2 border border-white pl-2'>{item.position}</h1>
                <h1 className='col-span-1 border border-white pl-2'>Nomor</h1>
                <h1 className='col-span-2 border border-white pl-2'>{item.shirtNumber}</h1>
                <h1 className='col-span-1 border border-white pl-2'>Negara</h1>
                <h1 className='col-span-2 border border-white pl-2'>{item.nationality}</h1>
                <h1 className='col-span-1 border border-white pl-2'>Umur</h1>
                <h1 className='col-span-2 border border-white pl-2'>{item.dateOfBirth===null?'':new Date().getFullYear()-Number(item.dateOfBirth.slice(0,4))+' Tahun'}</h1>
                </div>
            ))}
            </div>
            }
        </Layout>
    )
}
export default Team