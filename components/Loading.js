const Loading = () => {

    return(
        <div className='text-center w-full md:w-1/2 xl:w-1/3 mx-auto animate-pulse'>
            <img src='/logo.svg' width='100%' height='auto' alt='logo'/>
            <h1 className='text-2xl uppercase font-bold py-8'>... loading ...</h1>
        </div>
    )
}

export default Loading