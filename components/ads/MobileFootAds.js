import Image from 'next/image'

const MobileFootAds = ({img,link}) => {
    return(
        <section className='bg-gray-50 w-full md:hidden fixed bottom-6 px-3 z-30'>
            <a href={link} target='blank'>
            <Image src={img} layout='responsive' priority={true} width={320} height={50} alt='advertisment'/>
            </a>
        </section>
    )
}
export default MobileFootAds