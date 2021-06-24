import BetHead from "./BetHead"

const MatchDate = ({date,opsi}) => {
    return(
        <div className='flex py-1 pl-4 border-b border-gray-300 justify-between'>
            <h1 className='font-bold text-xs'>{date}</h1>
            <div className='lg:hidden'>
            <div className={opsi=='1 x 2'?'flex justify-between':'hidden'}>
                <BetHead>1</BetHead>
                <BetHead>X</BetHead>
                <BetHead>2</BetHead>
            </div>
            <div className={opsi=='hcap'?'flex justify-between':'hidden'}>
                <BetHead>1</BetHead>
                <BetHead>2</BetHead>
            </div>
            <div className={opsi=='total'?'flex justify-between':'hidden'}>
                <BetHead>O</BetHead>
                <BetHead>U</BetHead>
            </div>
            <div className={opsi=='lolos'?'flex justify-between':'hidden'}>
                <BetHead>1</BetHead>
                <BetHead>2</BetHead>
            </div>
            </div>
            <div className='hidden lg:flex justify-between'>
                <BetHead>1</BetHead>
                <BetHead>X</BetHead>
                <BetHead>2</BetHead>
                <BetHead>1</BetHead>
                <BetHead>2</BetHead>
                <BetHead>O</BetHead>
                <BetHead>U</BetHead>
                <BetHead>1</BetHead>
                <BetHead>2</BetHead>
            </div>
        </div>
    )
}
export default MatchDate