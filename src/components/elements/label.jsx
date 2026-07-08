export const Label = (props) => {
    const {htmlFor, children} = props
    return(
        <label htmlFor={htmlFor} className="flex flex-col gap-2">
            {children}
        </label>
    )
}