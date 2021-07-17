export default async function liveHandler(req,res){
    const live = await fetch('https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&filterData[type][]=1&filterData[sport][]=1')
    const liveData = await live.json()
    res.status(200).json(liveData.sport[1].region)
}