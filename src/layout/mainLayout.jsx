import { DataSidebar } from "../data/dataSidebar"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import {LogOut} from 'lucide-react'
import { useNavigate } from "react-router-dom"

export const MainLayout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return(
        <div className="h-screen w-screen flex overflow-hidden">
            <div className="w-[15%] bg-[#2E3F6D] text-white flex flex-col gap-6 p-2.5">
                <div className="flex justify-center mt-4">
                    <p className="font-bold text-3xl mt-2.5 mb-2.5">Sipjalau.</p>
                </div>

                <div className="flex flex-col flex-1 justify-between">
                    <div className="flex flex-col gap-2.5">
                        {DataSidebar.map((data) => {
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

                    <div className="flex justify-center items-center">
                        <button onClick={handleLogout} className="flex gap-2.5 mb-5 bg-white w-full justify-center rounded-lg p-2.5 items-center">
                            <LogOut className="text-red-500 rotate-180"/>
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