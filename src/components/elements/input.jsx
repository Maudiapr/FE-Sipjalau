export const Input = (props) => {
    const {type, name, id, placeholder, className} = props
    return(
        <input type={type} placeholder={placeholder} name={name} id={id} className={`border border-gray-300 outline-none focus:border-blue-600 p-1 ${className}`}/>
    )
}