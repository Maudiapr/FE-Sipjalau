import { AuthLayout } from "../layout/authLayout"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    
    const handleLogin = () => {
        navigate('/')
    }
    return(
        <AuthLayout title="Login" desc="Welcome to Happy Wash Laundry">
            <label htmlFor="username">
                <p>Username</p>
                <input type="text" name="userName" id="username" placeholder="Ucup Surucup" className="border border-gray-300 p-2.5 w-full rounded-sm"/>
            </label>

            <select name="role" className="border border-gray-300 p-2.5 rounded-sm h-10">
                <option value="">Pilih Role</option>
                <option value="kasir">Kasir</option>
                <option value="pekerja">Pekerja</option>
            </select>

            <label htmlFor="pass">
                <p>Password</p>
                <input type="text" name="password" id="pass" placeholder="**********" className="border border-gray-300 p-2.5 w-full rounded-sm"/>
            </label>

            <button onClick={handleLogin} className='bg-blue-900 text-white h-10 rounded-lg hover:bg-blue-700'>Login</button>
        </AuthLayout>
    )
}