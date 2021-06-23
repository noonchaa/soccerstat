import Image from 'next/image'

const MobileTopAds = ({img,link}) => {
    return(
        <section className='bg-gray-200 w-full md:hidden'>
            <a href={link} target='blank'>
            <Image src={img} layout='responsive' priority={true} width={300} height={100} alt='advertisment'/>
            </a>
        </section>
    )
}
export default MobileTopAds