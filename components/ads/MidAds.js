import Image from 'next/image'

export default function MidAds({img,link}) {
    return(
        <div className='w-full'>
            <a href={link} target='blank'>
            <Image src={img} layout='responsive' priority={true} width={300} height={250} alt='advertisment'/>
            </a>
        </div>
    )
}