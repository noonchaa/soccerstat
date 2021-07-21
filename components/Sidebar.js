import Region from './Region'
import Liga from './Liga'
import AdsImage from './AdsImage'

const Sidebar = ({liga}) => {

    return(
        <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-72'>
            <div className='w-64 text-center pt-12'>
                <AdsImage gb1='leftTop1.jpg' gb2='leftTop2.png' wd={250} tg={350}/>
            </div>
            <div className='flex flex-col w-64'>
                {liga==null?'':
                liga.map((item,index)=>(
                    <div key={index} className='even:bg-gray-800 bg-gray-900'>
                        <Region alias={item.alias} regionId={item.id}>
                            <Liga liga={item.liga} regionId={item.id}/>
                        </Region>
                    </div>
                ))
                }
            </div>
            <div className='w-64 text-center'>
                <AdsImage gb1='leftBot1.png' gb2='leftBot2.jpg' wd={300} tg={250}/>
            </div>
        </div>
    )
}
export default Sidebar
