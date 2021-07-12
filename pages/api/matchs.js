import {SoccerKey} from '../../lib/socerApi'

const nextWeek = new Date().setDate(new Date().getDate()+1)
const lastWeek = new Date().setDate(new Date().getDate()-1)

export default async function handler(req,res) {
    const match = await fetch(`https://api.football-data.org/v2/matches?dateFrom=${new Date(lastWeek).toISOString().substring(0,10)}&&dateTo=${new Date(nextWeek).toISOString().substring(0,10)}`,{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    const data = await match.json()
    res.status(200).json(data)
}