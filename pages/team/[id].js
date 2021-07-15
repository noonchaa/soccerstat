import Layout from '../../components/home/Layout'
import {FaGlobeEurope, FaYoutube, FaFacebook, FaInstagramSquare, FaTwitter} from 'react-icons/fa'

export const getStaticPaths = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const champions = Object.values(data.sport[1].region[20001].competition[566].game)
    const laliga = Object.values(data.sport[1].region[2150001].competition[545].game)
    const premiere = Object.values(data.sport[1].region[2570001].competition[538].game)
    const bundesliga = Object.values(data.sport[1].region[900001].competition[541].game)
    const ligue1 = Object.values(data.sport[1].region[830001].competition[548].game)
    const serieAbrazil = Object.values(data.sport[1].region[390001].competition[1792].game)
    const ligaProfesional = Object.values(data.sport[1].region[180001].competition[1685].game)
    const eredivisie = Object.values(data.sport[1].region[1640001].competition[1957].game)
    const mls = Object.values(data.sport[1].region[2420001].competition[3025].game)
    const premiereRus = Object.values(data.sport[1].region[1900001].competition[1993].game)
    const championship = Object.values(data.sport[1].region[2570001].competition[539].game)
    const libertadores = Object.values(data.sport[1].region[60001].competition[2988].game)
    const ArrayFunc = (isi) => {
        const testArray = isi.map(item=>item.team1_name).concat(isi.map(item=>item.team2_name))
        return testArray.map(item=>item.toLowerCase().replace(/ /g,'_').replace(/[^\w-]+/g,''))
    }
    const ArrayTeam = [champions,laliga,premiere,championship,bundesliga,ligue1,serieAbrazil,ligaProfesional,eredivisie,premiereRus,libertadores,mls]
    const finalArray = ArrayTeam.map(item=>ArrayFunc(item)).flat()
    
    const paths = finalArray.map((item) => ({
      params: { id: item },
    }))

    return {
        paths, 
        fallback:true
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${params.id}`)
    const data = await res.json()
    return {
        props: {
            team: data.teams
        },
        revalidate:1
    }
}

const Team = ({team}) => {

    if(team==null){
        return(
            <Layout>
            <div className='p-4 w-full md:w-2/3 xl:w-1/2 mx-auto my-16'>
                <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                <h1 className='text-center text-2xl py-4 animate-pulse text-red-500 font-bold'>Page Not Found</h1>
                <h1 className='text-center text-xl font-semibold'>Please Chose Another Page</h1>
            </div>
            </Layout>
        )
    }
    const sortedTeam = team.filter((item=>item.strSport=='Soccer'))[0]
    const {strTeamBadge,strTeam,strTeamShort,strCountry,intFormedYear,strLeague,strLeague2,strLeague3,strWebsite,strYoutube,strFacebook,strInstagram,strTwitter,strTeamJersey,strDescriptionEN,strStadiumThumb,strStadium,strStadiumLocation,intStadiumCapacity,strStadiumDescription} = sortedTeam

    return(
        <Layout title={strTeam} desc={strDescriptionEN.slice(0,500)} keyw={strTeam+', '+strLeague+', '+strLeague2+', '+strLeague3+', '+strCountry+', '+strStadium}>
            <div className='flex flex-col md:flex-row p-4 md:items-center'>
                <div className='md:w-1/3 self-start'>
                    <h1 className='text-2xl font-bold py-2'>{strTeam}<span className='uppercase'> {strTeamShort==null?'':' - '+strTeamShort}</span></h1>
                    <h1 className='text-xl font-bold py-2'>{strCountry} {intFormedYear}</h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaGlobeEurope className='text-blue-700 inline mr-4'/><a href={'https://'+strWebsite} target='_blank'>{strWebsite}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaYoutube className='text-red-600 inline mr-4'/><a href={'https://'+strYoutube} target='_blank'>@{strTeam.replace(/ /g,'_')}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaFacebook className='text-blue-700 inline mr-4'/><a href={'https://'+strFacebook} target='_blank'>@{strTeam.replace(/ /g,'_')}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaInstagramSquare className='text-pink-300 inline mr-4'/><a href={'https://'+strInstagram} target='_blank'>@{strTeam.replace(/ /g,'_')}</a></h1>
                    <h1 className='text-xl font-bold py-2 lowercase'><FaTwitter className='text-blue-500 inline mr-4'/><a href={'https://'+strTwitter} target='_blank'>@{strTeam.replace(/ /g,'_')}</a></h1>
                </div>
                <div className='w-full md:w-1/3 pb-4'>
                    {strTeamBadge==null||strTeamBadge==''||strTeamBadge==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Badge Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={strTeamBadge} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
                <div className='w-full md:w-1/3 pb-4'>
                    {strTeamJersey==null||strTeamJersey==''||strTeamJersey==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Jersey Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={strTeamJersey} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html:strDescriptionEN.replace(/\r\n\r\n/g,'<br/><br/>').replace(/\"/g,' - ')}} className='px-4'></div>
            
            <div className='flex flex-col md:flex-row p-4 md:items-center'>
                <div className='w-full md:w-1/2'>
                    {strStadiumThumb==null||strStadiumThumb==''||strStadiumThumb==undefined?
                    <div>
                        <img src='/logo.svg' alt='logo' width='100%' height='auto'/>
                        <h1 className='text-center'>Sorry Stadium Not Found</h1>
                    </div>
                    :
                    <div>
                        <img src={strStadiumThumb} alt='logo' width='100%' height='auto'/>
                    </div>
                    }
                </div>
                <div className='w-full md:w-1/2 md:pl-4'>
                    <h1 className='text-2xl font-bold py-2'>{strStadium}</h1>
                    <h1 className='text-xl font-bold py-2'>Location : {strStadiumLocation}</h1>
                    <h1 className='text-xl font-bold py-2'>Capacity : {intStadiumCapacity}</h1>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html:strStadiumDescription.replace(/\r\n\r\n/g,'<br/><br/>').replace(/\"/g,' - ')}} className='px-4 pb-4'></div>
        </Layout>
    )
}
export default Team