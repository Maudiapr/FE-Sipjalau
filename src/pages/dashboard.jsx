import { Header } from "../layout/headerLayout"
import { Clock } from "../components/clock"
import { dataFaktur } from "../data/data"
import { useState } from "react"
import { DetailFaktur } from "../components/detailFaktur"

export const Dashboard = () => {

    const [openDetailFaktur, setOpenDetailFaktur] = useState(false)

    return(
        <div className=" flex flex-col gap-4">
            <Header
                title = "Dahsboard"
                left = <Clock/>

                classNameLeft ="flex justify-between"
            />

            <div className="flex flex-col w-full">
                <div className="flex justify-evenly gap-5 font-semibold">
                    <div className="flex flex-col justify-evenly items-center p-2.5 bg-[#E5EDFA] border border-gray-400 rounded-xl w-1/2">
                        <p className="text-[#2E3F6D]">Total Order yang Berjalan</p>
                        <p className="text-6xl">60</p>
                    </div>

                    <div className="flex flex-col justify-evenly items-center p-2.5  bg-[#E5EDFA] border border-gray-400 rounded-xl w-1/2">
                        <p className="text-[#2E3F6D]">Harus Selesai Hari Ini</p>
                        <p className="text-6xl ">37</p>
                    </div>
                </div>

                <div className='mt-6 border border-gray-400 bg-[#E5EDFA] flex flex-col gap-6 p-2.5 rounded-xl'>
                    <p className='text-[#2E3F6D] text-lg font-semibold'>Order yang Harus Selesai Hari Ini</p>
                    
                    <div className='h-105 overflow-y-auto scrollbar-thin'>
                        <table className='w-full text-center h-20'>
                            <thead className='text-gray-500 text-sm'>
                                <tr className='border-b border-gray-600 bg-[#E5EDFA] sticky top-0'>
                                    <th className='px-6 py-4'>Nomor Faktur</th>
                                    <th className='px-6 py-4'>Nama Pelanggan</th>
                                    <th className='px-6 py-4'>Tanggal Transaksi</th>
                                    <th className='px-6 py-4'>Total Transaksi</th>
                                    <th className='px-6 py-4'>Detail</th>
                                </tr>
                            </thead>    

                            <tbody className='text-[#2E3F6D] bg-white text-sm'>
                                {dataFaktur.map((data) => (
                                    <tr key={data.id} className='border-b border-gray-300'>
                                        <td className="px-4 py-4 text-[#2E3F6D]">{data.invoice}</td>
                                        <td className="px-4 py-4 text-[#2E3F6D]">{data.name}</td>
                                        <td className="px-4 py-4 text-[#2E3F6D]">{data.date}</td>
                                        <td className="px-4 py-4 text-[#2E3F6D]">Rp {data.total.toLocaleString("id-ID")}</td>
                                        <td><button className='bg-[#A2B7E4] text-[#2E3F6D] rounded-2xl p-2 text-sm' onClick={() => setOpenDetailFaktur(true)}>Lihat Detail</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {openDetailFaktur && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <DetailFaktur onClose={() => setOpenDetailFaktur(false)} />
                </div>
            )}
        </div>
    )
}