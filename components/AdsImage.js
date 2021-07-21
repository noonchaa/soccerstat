import { useEffect, useState } from "react"
import Image from 'next/image'

const AdsImage = ({gb1,gb2,wd,tg}) => {
    const [swap, setSwap] = useState(false)

    useEffect(()=>{
        const swapAds = setInterval(()=>{
            setSwap(!swap)
        },9000)
        return () => {
            clearInterval(swapAds)
        }
    },[swap])

    return(
        <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
        <Image src={swap==false?'/'+gb1:'/'+gb2} width={wd} height={tg} alt='ads'/>
        </a>
    )
}
export default AdsImage