export default async function leagueHandler(req,res){
    const {id} = req.query
    const getLeague = await fetch(`https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[sport][]=1&filterData[region][]=${id}`)
    const league = await getLeague.json()
    
    res.status(200).json(league.sport[1].region)
}