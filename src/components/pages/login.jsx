import { AuthLayout } from "../layout/authLayout"
import { InputField } from "../elements/inputField"

export const Login = () => {
    return(
        <AuthLayout title="Login" desc="Welcome to Happy Wash Laundry">
            <InputField placeholder="Ucup Surucup" label="Username" type="text" id="username" name="username" htmlFor="username" classNameI="rounded-lg h-10"/>
            <InputField placeholder="Ucup" label="Name" type="text" id="name" name="name" htmlFor="name" classNameI="rounded-lg h-10"/>
    
            <select name="role" className="border border-gray-300 p-1 outline-none focus:border-blue-600 rounded-lg text-sm h-10">
                <option value="">Pilih Role</option>
                <option value="kasir">Kasir</option>
                <option value="pekerja">Pekerja</option>
            </select>

            <InputField placeholder="********" label="Password" type="password" id="password" name="password" htmlFor="password" classNameI="rounded-lg h-10 placeholder:text-start"/>
        </AuthLayout>
    )
}