const TwoBet = ({satu,dua}) => {
    return(
        <div className='text-center w-12 py-1 border-l border-gray-300 xl:w-16'>
            <h1 className='font-semibold text-xs pb-2'>
                {satu}
            </h1>
            <h1 className='font-bold text-xs'>
                {dua}
            </h1>
        </div>
    )
}
export default TwoBet