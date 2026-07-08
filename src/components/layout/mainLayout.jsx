    import { DataSidebar } from "../data/dataSidebar"
    import { Outlet } from "react-router-dom"
    import { NavLink } from "react-router-dom"
    import { Button } from "../elements/button"
    import {Power} from 'lucide-react'

    export const MainLayout = (props) => {
        const {title} = props
        const IconLogout = Power
        return(
            <div className="h-screen w-screen flex">
                <div className="w-[20%] bg-[#8DB1D0] text-white flex flex-col gap-6 p-2.5">
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
                            <Button className="flex gap-2.5 mb-5 bg-white w-full justify-center rounded-lg p-2.5 items-center">
                                <IconLogout className="text-red-500"/>
                                <p className="text-black font-light">Keluar</p>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-[80%] bg-[#E8ECEF] overflow-y-auto scrollbar-thin">
                    <div>
                        <h1>{title}</h1>
                    </div>

                    <div>
                        <Outlet/>
                    </div>
                </div>
            </div>
        )
    }