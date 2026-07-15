import { DataSidebar } from "../data/dataSidebar"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import {LogOut} from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const MainLayout = () => {
    const navigate = useNavigate()

    const {user, logout} = useAuth()
    const fitur = DataSidebar.filter((item) => item.role.includes(user?.role))

    console.log(user)
    
    const handleLogout = async () =>{
        try{
            await logout()  

            navigate("/login", {replace: true})
        } catch (err){
            console.log(err)
        }
    }
    return(
        <div className="h-screen w-screen flex overflow-hidden">
            <div className="w-[15%] bg-[#2E3F6D] text-white flex flex-col gap-6 p-2.5">
                <div className="flex justify-center mt-4">
                    <p className="font-bold text-3xl mt-2.5 mb-2.5">Sipjalau.</p>
                </div>

                <div className="flex flex-col flex-1 justify-between">
                    <div className="flex flex-col gap-2.5">
                        {fitur.map((data) => {
                            const Icon = data.Icon
                            return(
                                <NavLink to={data.path} key={data.index} className={({isActive}) => `flex items-center font-light gap-2.5 .5 p-2.5 ${isActive ?  "bg-[#BBD0ED] rounded-xl text-[#2E3F6D]" : "bg-none" }`}>
                                    {({isActive}) => (
                                        <>
                                            <Icon className={isActive? " text-white fill-white" : " fill-white"}/>
                                            <p>{data.title}</p>
                                        </>
                                    )}
                                </NavLink>
                            )
                        })}
                    </div>

                    <div className="mb-5">
        <div className="flex justify-center items-center mb-4">
            <p className="font-semibold text-white">
                {user?.username}
            </p>
            <p className="mx-1">•</p>
            <p className="text-sm text-gray-300 capitalize">
                {user?.role}
            </p>
        </div>

        <button
            onClick={handleLogout}
            className="flex gap-2.5 hover:bg-gray-200 bg-white w-full justify-center rounded-lg p-2.5 items-center"
        >
            <LogOut className="text-red-500 rotate-180" />
            <p className="text-black font-light">Keluar</p>
        </button>
    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#BBD0ED] p-6 ">
                <Outlet/>
            </div>
        </div>
    )
}