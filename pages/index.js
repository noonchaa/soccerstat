import Jadwal from "../components/home/Jadwal"
import Layout from "../components/home/Layout"

export const getStaticProps = async () => {
    const res = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=0&filterData[type][]=2&filterData[sport][]=1')
    const data = await res.json()
    const champions = data.sport[1].region[20001].competition[566]
    const laliga = data.sport[1].region[2150001].competition[545]
    const premiere = data.sport[1].region[2570001].competition[538]
    const bundesliga = data.sport[1].region[900001].competition[541]
    const ligue1 = data.sport[1].region[830001].competition[548]
    const serieAbrazil = data.sport[1].region[390001].competition[1792]
    const ligaProfesional = data.sport[1].region[180001].competition[1685]
    const eredivisie = data.sport[1].region[1640001].competition[1957]
    const mls = data.sport[1].region[2420001].competition[3025]
    const premiereRus = data.sport[1].region[1900001].competition[1993]
    const championship = data.sport[1].region[2570001].competition[539]
    const libertadores = data.sport[1].region[60001].competition[2988]
    const team = [champions,laliga,premiere,championship,bundesliga,ligue1,serieAbrazil,ligaProfesional,eredivisie,premiereRus,libertadores,mls]

    return {
        props: {
            matchs : team
        },
        revalidate : 1
    }
}

const Vbet = ({matchs}) => {

    return(
        <Layout desc={matchs.map(item=>item.name).join(' ')} keyw={matchs.map(item=>item.name).join(', ')} >
            {matchs.map((item,index)=>(
                <Jadwal nama={item.name} game={item.game} key={index}/>
            ))}
        </Layout>
    )
}
export default Vbet