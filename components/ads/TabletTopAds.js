import Image from 'next/image'

const TabletTopAds = ({img,link}) => {
    return(
        <section className='bg-gray-200 w-full hidden md:block'>
            <a href={link} target='blank'>
            <Image src={img} layout='responsive' priority={true} width={728} height={90} alt='advertisment'/>
            </a>
        </section>
    )
}
export default TabletTopAds