const BetSelector = ({children,opsi}) => {
    return(
        <div className={opsi==children?'px-2 py-1 rounded-md bg-red-600':'px-2 py-1 rounded-md bg-gray-50'}>
            <h1 className={opsi==children?'text-white text-xs font-medium uppercase':'text-blue-900 text-xs font-medium uppercase'}>
                {children}
            </h1>
        </div>
    )
}
export default BetSelector