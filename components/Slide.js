import { useEffect, useState } from "react"

const Slide = () => {
    const [slide,setSlide] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setSlide(!slide)
        },7000)
        return ()=>{
            clearTimeout()
        }
    },[slide])
    return(
        slide==false?
        <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
        <div className='animate-pulse overflow-hidden text-center'>
            <h1 className='font-semibold'>
                Special Promo : Free Bet 20 Euro *
            </h1>
        </div>
        </a>
        :
        <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
        <div className='animate-pulse overflow-hidden text-center'>
            <h1 className='font-semibold'>
                Welcome Bonus : Double your deposit 100% *
            </h1>
        </div>
        </a>
    )
}
export default Slide