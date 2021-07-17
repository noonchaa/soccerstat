export default async function marketHandler(req,res){
    const {id} = req.query
    const market = await fetch(`https://feedodds.com/feed/json?language=eng&timeZone=Asia/Jakarta&brandId=4&key=445f6b52b11d40b959a78b38a3651694&gameId=${id}`)
    const dataMarket = await market.json()
    const sendData = !dataMarket?[]:dataMarket.markets

    res.status(200).json(sendData)
}