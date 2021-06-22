

const ServerInfo = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const waktu = new Date().toLocaleDateString('ID', options)

    return (
        <div className='w-full text-center py-2 flex justify-evenly bg-gray-50 filter drop-shadow-md'>
            <h1 className='text-base font-bold text-black capitalize' >{waktu}</h1>
            <h1 className='text-base font-bold text-black capitalize' >
                Server : 
                <span className='text-base font-bold text-green-600 uppercase'> Fonbet-v0.3.1
                </span>
            </h1>
        </div>
    )
}
export default ServerInfo