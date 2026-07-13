import { dataOrder } from "../data/data";
import { useState } from "react";
import { InputOrder } from "./inputOrder";
import { Header } from "../layout/headerLayout";
import { Clock } from "../pages/clock";
import {Plus, Search} from 'lucide-react'
import { DetailOrder } from "./detailOrder";

export const Order = () => {

    const [openInputOrder, setOpenInputOrder] = useState(false)
    const [openDetailOrder, setOpenDetailOrder] = useState(false)
    const [filterStatus, setFilterStatus] = useState("Semua")
        
    const filterCardOrder = filterStatus === "Semua" ? dataOrder : dataOrder.filter((order) => order.status === filterStatus)

    return(
        <div className="h-full  flex flex-col">
            <Header
                title = "Order" subtitle={`${filterCardOrder.length} order ditemukan`} 

                left =<Clock/>
                classNameLeft = "flex justify-between"

                right={
                    <div className="flex  justify-between items-center w-full">
                        <div className="flex gap-4 mt-2.5 mb-5">
                            <button onClick={() => setFilterStatus("Semua")} className={`p-2 rounded-lg w-fit ${filterStatus === "Semua" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Semua</button>
                            <button onClick={() => setFilterStatus("Menunggu Diproses")} className={`p-2 rounded-lg w-fit ${filterStatus === "Menunggu Diproses" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Menunggu Diproses</button>
                            <button onClick={() => setFilterStatus("Siap Diambil")} className={`p-2 rounded-lg w-fit ${filterStatus === "Siap Diambil" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Siap Diambil</button>
                        </div>

                        <div className="flex mr-2.5 gap-2.5 items-center">
                            <div className="relative">
                                <Search size={15} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <input type="text" placeholder="Cari Order" name="searchOrder" className="bg-white w-70 h-10 rounded-xl pl-10" />  
                            </div>

                            <button onClick={() => setOpenInputOrder(true)} className=" p-2.5 bg-[#2C3E7A] flex rounded-lg justify-center items-center gap-2 h-10 w-fit text-white">
                                <Plus size={15}/>
                                <p className="text-sm"> Tambah Order</p>
                            </button>
                        </div>
                    </div>}
                classNameRight = "flex justify-between"
            />
            {openInputOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <InputOrder onClose={() => setOpenInputOrder(false)} />

                </div>
            )}

            {/* Main */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 items-center justify-center ">
                    {filterCardOrder.map((data) => (
                        <div key={data.index} className="border gap-2 flex flex-col justify-between bg-white h-fit rounded-lg border-gray-300 p-4 w-full max-w-100">
                            <div>
                                <div className=" flex justify-between">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg">{data.nama}</h1>
                                        <div className="flex gap-2.5 text-sm text-gray-400">
                                            <p>Order</p>
                                            <p>{data.order}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5  items-end">
                                        <h2 className="bg-orange-200 text-xs p-1 h-fit rounded-lg">{data.status}</h2>
                                        <h2 className="bg-red-200 align-end text-xs w-fit p-1 h-fit rounded-lg">{data.tipe}</h2>
                                    </div>

                                </div>

                                <div className="border border-gray-100 w-full m-1.5"/>

                                <div className="flex justify-between text-sm mb-2.5 mt-2.5">
                                    <p>Estimasi Selesai</p>
                                    <div className="flex gap-1">
                                        <h1 className="text-gray-400">{data.tanggal}</h1>
                                        <p>・</p>
                                        <p className="text-gray-300">{data.jam}</p>
                                    </div>
                                </div>

                                <div className="border border-gray-100 w-full m-1.5"/>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h3>Total</h3>
                                    <p className="text-lg">Rp. {data.total}</p>
                                </div>

                                <h3 className={`text-xs h-fit p-1.5 rounded-full ${data.keteranganPayment === "Lunas" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} `}>{data.keteranganPayment}</h3>
                            </div>
                            <button className="border border-gray-300 text-gray-500 p-2.5 w-full rounded-lg" onClick={ () => setOpenDetailOrder(true)}>
                                Lihat Detail
                            </button>

                        </div>
                    ))}
                </div>
            </div>
            {openDetailOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <DetailOrder onClose={() => setOpenDetailOrder(false)} />
                </div>
            )}
        </div>
    )
}