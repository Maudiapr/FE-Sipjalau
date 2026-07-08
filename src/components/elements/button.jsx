export const Button = (props) => {
    const {type, children, className, ...rest} = props
    return(
        <button type={type} className={`bg-[#2E3F6D] p-3 font-bold ${className}`} {...rest}>{children}</button>
    )
}
