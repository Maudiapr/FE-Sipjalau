import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { AuthLayout } from "../layout/authLayout"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

export const Login = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {login} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
     async function handleLogin(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
        await login(username, password)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        navigate("/");
        } catch{
            setUsername("")
            setPassword("")
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <AuthLayout title="Login" desc="Welcome to Happy Wash Laundry">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <label htmlFor="username">
                    <p>Username</p>
                    <input type="text" name="userName" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ucup Surucup" className="border border-gray-300 p-2.5 w-full rounded-sm"/>
                </label>

                <label htmlFor="pass">
                    <p>Password</p>
                    <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="pass" placeholder="**********" className="border border-gray-300 p-2.5 w-full rounded-sm"/>
                </label>

                <button type="submit" disabled={isLoading} className='w-full bg-blue-900 text-white h-10 rounded-lg hover:bg-blue-700'>
                    {isLoading? (
                        <div className="flex gap-2.5 justify-center items-center">
                        <LoaderCircle className="animate-spin"/> Login
                        </div>
                    ) : ("Login")}
                </button>
            </form>
        </AuthLayout>
    )
}