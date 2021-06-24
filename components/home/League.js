const League = ({title,number}) => {
    return(
        <div className='py-2 bg-gray-50 px-4 border-b border-gray-300 flex justify-between sticky top-20 lg:top-10'>
            <h1 className='font-bold text-red-600 text-sm'>
                {title}
            </h1>
            <div className='bg-gray-300 px-2'>
                <h1 className='font-bold text-sm'>
                    {number}
                </h1>
            </div>
        </div>
    )
}
export default League