export default async function matchHandler(req,res){
    const match = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[start_ts]=10800&filterData[sport][]=1')
    const matchData = await match.json()
    res.status(200).json(matchData.sport[1].region)
}