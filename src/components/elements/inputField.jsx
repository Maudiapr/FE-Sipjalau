import { Input } from "./input"
import { Label } from "./label"

export const InputField = (props) => {
    const {label, placeholder, type, htmlFor, name, id, className, classNameI} =props
    return(
            <Label htmlFor={htmlFor}>
                <h1 className={className}>{label}</h1>
                <Input type={type} placeholder={placeholder} name={name} id={id} className={classNameI}/>
            </Label>
    )
}