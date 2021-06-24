import OneBet from "./OneBet"
import TwoBet from "./TwoBet"

const MatchHalf = ({children,opsi}) => {
    return(
        <div className='flex border-gray-300 border-b justify-between items-center'>
            <div className='px-4 py-1'>
                <h1 className='text-xs font-semibold pb-2 italic'>{children}</h1>
            </div>
            <div className='lg:hidden'>
                <div className={opsi=='1 x 2'?'flex justify-between':'hidden'}>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                </div>
                <div className={opsi=='hcap'?'flex justify-between':'hidden'}>
                    <TwoBet satu='-1.5' dua='2.45' />
                    <TwoBet satu='1.5' dua='3.45' />
                </div>
                <div className={opsi=='total'?'flex justify-between':'hidden'}>
                    <TwoBet satu='-1.5' dua='2.45' />
                    <TwoBet satu='1.5' dua='3.45' />
                </div>
                <div className={opsi=='lolos'?'flex justify-between':'hidden'}>
                    <OneBet>2.32</OneBet>
                    <OneBet>2.32</OneBet>
                </div>
            </div>
            <div className='hidden lg:flex justify-between'>
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
                <TwoBet satu='-1.5' dua='2.45' />
                <TwoBet satu='1.5' dua='3.45' />
                <TwoBet satu='-1.5' dua='2.45' />
                <TwoBet satu='1.5' dua='3.45' />
                <OneBet>2.32</OneBet>
                <OneBet>2.32</OneBet>
            </div>
        </div>
    )
}
export default MatchHalf