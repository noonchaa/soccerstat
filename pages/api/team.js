import {SoccerKey} from '../../lib/socerApi'

export default async function handler(req,res) {
    const {query} = req.query
    const match = await fetch(`https://api.football-data.org/v2/teams/${query}`,{
        method:'GET', headers: {'X-Auth-Token' : SoccerKey}
    })
    const data = await match.json()
    res.status(200).json(data)
}