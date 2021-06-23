import Image from 'next/image'

const SideAds = ({img,link}) => {
    return(
        <section className='w-40 flex-none hidden lg:block self-start sticky top-0'>
            <a href={link} target='blank'>
            <Image src={img} width={160} height={600} priority={true} alt='advertisment'/>
            </a>
        </section>
    )
}
export default SideAds