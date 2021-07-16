const Liga = ({liga}) => {
    return(
        Object.values(liga).map((item,index)=>(
            <div className='px-4 py-2 cursor-pointer' key={index}>
                <h1 className='font-semibold'>{item.name}</h1>
            </div>
        ))
    )
}
export default Liga