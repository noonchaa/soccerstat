import Image from 'next/image'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'

const Sidebar = ({team}) => {
    const router = useRouter()
    /*useEffect(()=>{
        const scriptText = document.createTextNode('!function(e,t,a,n,c,s){e.affScriptCount = e.affScriptCount == undefined ? 0 : e.affScriptCount+1;if(e.affScriptUrl === undefined){e.affScriptUrl = {};}e.affScriptUrl[e.affScriptCount] = n;s = s + "_" + e.affScriptCount;e.bcAnalyticsObject=c,e[c]=e[c]||function(){(e[c].q=e[c].q||[]).push(arguments),e[c].u=e[c].u||n};var i=t.createElement(a),o=t.getElementsByTagName(a)[0];i.async=!0,i.src=n+"analytics/banner.js",i.id=s,!t.getElementById(s)&&o.parentNode.insertBefore(i,o)}(window,document,"script","https://vbetaffiliates-admin.com/global/","ba","bafTrSc"),ba("_setUrl","https://vbetaffiliates-admin.com/global/"),ba("_setAccount",512950),ba("_mId",203620);')

        const script = document.createElement('script')

        script.appendChild(scriptText)

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    },[])*/

    return(
        <div className='bg-gray-900 overflow-y-auto overscroll-none h-screen w-72'>
            <div className='w-64 text-center'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375'>
                    <Image src='/250x350.jpg' width={250} height={350} alt='advertisement' className='mx-auto'/>
                </a>
            </div>
            <div className='flex flex-col w-64'>
                {team.map((item,index)=>(
                <Link href={'/league/'+item.id} key={index}>
                    <a className={router.asPath==='/league/'+item.id?
                        'px-4 py-2 font-medium italic bg-red-600 text-center':
                        'px-4 py-2 font-medium'}>
                        {item.name}
                    </a>
                </Link>
                ))}
            </div>
            <div className='w-64 text-center pb-8'>
                <a href='https://www.vshortly.com/affiliates/?btag=512950_l135375'>
                <Image src='/300x250.png' width={300} height={250} alt='advertisment'/>
                </a>
            </div>
        </div>
    )
}
export default Sidebar
