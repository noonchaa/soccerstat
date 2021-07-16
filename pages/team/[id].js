import Layout from '../../components/home/Layout'
import {FaGlobeEurope, FaYoutube, FaFacebook, FaInstagramSquare, FaTwitter} from 'react-icons/fa'
import {useRouter} from 'next/router'

export const getStaticPaths = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()

    const allMatchs = data.sport[1].region
    const allGame = Object.values(allMatchs).slice(1).map(comp=>comp.competition).flatMap(liga=>Object.values(liga)).flatMap(match=>Object.values(match.game))
    const totalTeam = allGame.map(team1=>team1.team1_name).concat(allGame.map(team2=>team2.team2_name)).filter(allteam=>allteam!=undefined)
    
    const paths = totalTeam.map((item) => ({
      params: { id: item },
    }))

    return {
        paths, 
        fallback:true
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${params.id}`)
    const liga = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const dataLiga = await liga.json()
    return {
        props: {
            team: data.teams,
            allMatchs : dataLiga.sport[1].region
        },
        revalidate:1
    }
}

const Team = ({team,allMatchs}) => {
    const router = useRouter()
    const allTeams = !allMatchs?null:Object.values(allMatchs)

    if(team==null||team.filter((item=>item.strSport=='Soccer'))[0]==undefined||router.isFallback){
        return(
            <Layout allComp={allTeams==null?null:allTeams.slice(1)}>
                <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto'>
                    <img src='/logo.svg' alt='logo' width='100%' height='auto' className='animate-pulse'/>
                    <h1 className='text-center text-2xl py-4 font-bold'>Team Not Found</h1>
                    <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
                </div>
            </Layout>
        )
    }
    const sortedTeam = team.filter((item=>item.strSport=='Soccer'))[0]

    return(
        <Layout title={sortedTeam.strTeam==undefined?'':sortedTeam.strTeam} desc={sortedTeam.strDescriptionEN==undefined?'':sortedTeam.strDescriptionEN.slice(0,500)} keyw={sortedTeam.strTeam==undefined?'':sortedTeam.strTeam+', '+sortedTeam.strLeague+', '+sortedTeam.strLeague2+', '+sortedTeam.strLeague3+', '+sortedTeam.strCountry+', '+sortedTeam.strStadium} allComp={allTeams==null?null:allTeams.slice(1)}>
            <div className='flex flex-col md:flex-row p-4 md:items-center'>
                <div className='md:w-1/3 self-start'>
                    <h1 className='text-2xl font-bold py-2'>{sortedTeam.strTeam==undefined?'':sortedTeam.strTeam}<span className='uppercase'> {sortedTeam.strTeamShort==null?'':' - '+sortedTeam.strTeamShort}</span></h1>
                    <h1 className='text-xl font-bold py-2'>{sortedTeam.strCountry} {sortedTeam.intFormedYear}</h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaGlobeEurope className='text-blue-700 inline mr-4'/><a href={'https://'+sortedTeam.strWebsite} target='_blank'>{sortedTeam.strWebsite}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaYoutube className='text-red-600 inline mr-4'/><a href={'https://'+sortedTeam.strYoutube} target='_blank'>@{sortedTeam.strTeam==undefined?'':sortedTeam.strTeam}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaFacebook className='text-blue-700 inline mr-4'/><a href={'https://'+sortedTeam.strFacebook} target='_blank'>@{sortedTeam.strTeam==undefined?'':sortedTeam.strTeam}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaInstagramSquare className='text-pink-300 inline mr-4'/><a href={'https://'+sortedTeam.strInstagram} target='_blank'>@{sortedTeam.strTeam==undefined?'':sortedTeam.strTeam}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaTwitter className='text-blue-500 inline mr-4'/><a href={'https://'+sortedTeam.strTwitter} target='_blank'>@{sortedTeam.strTeam==undefined?'':sortedTeam.strTeam}</a></h1>
                </div>
                <div className='w-full md:w-1/3 pb-4'>
                    {sortedTeam.strTeamBadge==null||sortedTeam.strTeamBadge==''||sortedTeam.strTeamBadge==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Badge Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={sortedTeam.strTeamBadge} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
                <div className='w-full md:w-1/3 pb-4'>
                    {sortedTeam.strTeamJersey==null||sortedTeam.strTeamJersey==''||sortedTeam.strTeamJersey==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Jersey Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={sortedTeam.strTeamJersey} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html: sortedTeam.strDescriptionEN==null?'':sortedTeam.strDescriptionEN.replace(/\r\n\r\n/g,'<br/><br/>').replace(/\"/g,' - ')}} className='px-4'></div>
            
            <div className='flex flex-col md:flex-row p-4 md:items-center'>
                <div className='w-full md:w-1/2'>
                    {sortedTeam.strStadiumThumb==null||sortedTeam.strStadiumThumb==''||sortedTeam.strStadiumThumb==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Stadium Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={sortedTeam.strStadiumThumb} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
                <div className='w-full md:w-1/2 md:pl-4'>
                    <h1 className='text-2xl font-bold py-2'>{sortedTeam.strStadium}</h1>
                    <h1 className='text-xl font-bold py-2'>Location : {sortedTeam.strStadiumLocation}</h1>
                    <h1 className='text-xl font-bold py-2'>Capacity : {sortedTeam.intStadiumCapacity}</h1>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html:sortedTeam.strStadiumDescription==null?'':sortedTeam.strStadiumDescription.replace(/\r\n\r\n/g,'<br/><br/>').replace(/\"/g,' - ')}} className='px-4 pb-4'></div>
        </Layout>
    )
}
export default Team