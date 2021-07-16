import Image from 'next/image'
import Region from './Region'
import Liga from './Liga'

const Sidebar = ({team}) => {

    return(
        <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-72'>
            <div className='w-64 text-center pt-12'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                    <Image src='/250x350.jpg' width={250} height={350} alt='advertisement' className='mx-auto'/>
                </a>
            </div>
            <div className='flex flex-col w-64'>
                {team==null?'':
                team.map((item,index)=>(
                    <div key={index} className='even:bg-gray-800 bg-gray-900'>
                        <Region alias={item.alias} regionId={item.id}>
                            <Liga liga={item.competition} regionId={item.id}/>
                        </Region>
                    </div>
                ))
                }
            </div>
            <div className='w-64 text-center'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375' target='_blank'>
                <Image src='/300x250.png' width={300} height={250} alt='advertisment'/>
                </a>
            </div>
        </div>
    )
}
export default Sidebar
