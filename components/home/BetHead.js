const BetHead = ({children}) => {
    return (
        <div className='text-center w-12 border-l border-gray-300 xl:w-16'>
            <h1 className='font-normal text-xs'>
                {children}
            </h1>
        </div>
    )
}
export default BetHead