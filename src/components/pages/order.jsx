import { dataOrder } from "../data/dataOrder";
import { Input } from "../elements/input";
import { useState } from "react";
import { InputOrder } from "./inputOrder";

export const Order = () => {

    const [openInputOrder, setOpenInputOrder] = useState(false)

    return(
        <div className="ml-6">
            <div className="mt-6">
                <div className="flex justify-between">
                    <h2 className="text-4xl">Order</h2>

                    <div className="flex gap-2.5 mr-2.5">
                        <Input type="text" placeholder="Cari Order" name="cariOrder" className="bg-white w-65 h-10"/>
                        <button onClick={() => setOpenInputOrder(true)} className=" p-2.5 bg-[#2C3E7A] rounded-lg h-10 w-fit text-white"> Tambah Order </button>
                        {openInputOrder && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                    <InputOrder onClose={() => setOpenInputOrder(false)} />

                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mt-2.5 mb-5">
                    <button className="bg-[#E5EDFA] text-[#2E3F6D] p-2 rounded-lg w-25">All</button>
                    <button className="bg-[#E5EDFA] text-[#2E3F6D]  p-2 rounded-lg w-30">On Process</button>
                    <button className="bg-[#E5EDFA] text-[#2E3F6D]  p-2 rounded-lg w-25">Complete</button>
                </div>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 gap-y-6 gap-x-1.5 pb-15">
                {dataOrder.map((data) => (
                    <div key={data.index} className="border gap-2 flex flex-col justify-between bg-white h-fit rounded-lg border-gray-300 p-4 w-full max-w-70">
                        <div>
                            <div className=" flex justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-lg">{data.nama}</h1>
                                    <div className="flex gap-2.5 text-gray-400">
                                        <p>{data.order}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5  items-end">
                                    <h2 className="bg-green-200 text-xs p-1 h-fit rounded-lg">{data.status}</h2>
                                    <h2 className="bg-red-200 align-end text-xs w-fit p-1 h-fit rounded-lg">{data.tipe}</h2>
                                </div>

                            </div>

                            <div className="border border-gray-300 m-1.5"/>

                            <div className="flex justify-between text-sm">
                                <h1 className="text-gray-400">{data.tanggal}</h1>
                                <p className="text-gray-300">{data.jam}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h3>Total</h3>
                                <p className="text-lg">Rp. {data.total}</p>
                            </div>

                            <h3 className="bg-green-200 text-xs h-fit p-1.5 rounded-lg">{data.keteranganPayment}</h3>
                        </div>
                        
                        <button className="border border-gray-300 text-gray-500 p-2.5 w-full rounded-lg">
                            Lihat Detail
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}