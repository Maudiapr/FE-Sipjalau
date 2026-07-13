import {X, Circle} from "lucide-react"
import { orderItems } from "../data/data"
import { timelineOrder } from "../data/data"



export const DetailFaktur = ({onClose}) => {

    return(
        <div className="text-sm font-inter w-140 max-h-[90vh] flex flex-col overflow-y-auto scrollbar-thin bg-white rounded-xl">
            <div className="flex justify-between p-4 sticky top-0 bg-white border-b-2 border-gray-200">
                <div className='flex flex-col'>
                    <h2>INV-2025-039</h2>
                    <p className=' text-gray-400'>Diterima: Rab, 3 Jul 2026 · 09:15</p>
                </div>
                    <button onClick={onClose}><X/></button>
            </div>

            <div className='p-4'>
                <h1 className='text-gray-400'>STATUS PESANAN</h1>
            </div>

            <hr className="border border-gray-100"/> 

            <div className='flex flex-col gap-2.5 p-4'>
                <h1 className='text-gray-400'>PELANGGAN</h1>

                <div className='flex flex-col gap-1'>
                    <h2 className='font-semibold'>Rina Wulandari</h2>
                    <p className=' text-gray-400'><span>☎</span> 0812-3456-7890</p>
                    
                    <div className='flex gap-2'>
                        <p className='bg-blue-200 w-fit p-2 rounded-lg text-blue-600'>Express</p>
                        <p className='bg-green-200 w-fit p-2 rounded-lg text-green-600'>Sudah Bayar</p>
                    </div>
                </div>
            </div>

            <hr className="border border-gray-100"/> 
            
            <div className='p-4 gap-2.5 flex flex-col'>
                <h1 className='text-gray-400'>ITEM PESANAN</h1>

                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-100 font-medium text-gray-400">
                    <div className='col-span-7'>Layanan</div>
                    <div className='col-span-2'>Qty/Kg</div>
                    <div className='col-span-3 text-center'>Harga</div>
                </div>
                {orderItems.map((data) => (
                    <div key={data.id} className="grid grid-cols-12 gap-4 py-2.5 border-t border-gray-200">
                        <div className="col-span-7">
                            <div className='flex gap-1 flex-col'>
                                <p className="font-semibold text-md">{data.layanan}</p>
                                <p className="text-gray-400 mt-1">{data.kategori} • {data.satuan} • {data.estimasi}</p>
                                <p className='bg-gray-200 text-gray-400 w-fit p-1.5 rounded-md border  border-gray-400'>{data.label}</p>
                            </div>
                        </div>

                        <div className="col-span-2 text-gray-400"><p>{data.qty}</p></div>

                        <div className="col-span-3 flex justify-end text-gray-600"><p>{data.harga}</p></div>
                    </div>
                ))}
            </div>

            <hr className="border border-gray-100"/> 

            <div className='p-4 flex flex-col gap-2.5'>
                <h1 className='text-gray-400'>TIMELINE</h1>

                <div className="flex gap-1 justify-center items-center">
                    {timelineOrder.map((data) => (
                        <div key={data.id} className="flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-xl w-35 gap-2">
                        <div className="flex gap-1 items-center">
                                <Circle
                                    size={10}
                                    fill={data.completed? "#22C55E" : "white"}
                                    stroke={data.completed?  "#22C55E" : "#D1D5DB"}
                                    strokeWidth={2}
                                />

                                <p className="text-gray-400">{data.title}</p>
                        </div>

                        <p className={data.date? "text-black" : "text-gray-400"}>{data.date ?? "—"}</p>
                        </div>

                    ))}
                </div>
            </div>
            
            <div className='bg-gray-100 flex w-full gap-2.5 p-4 justify-between border-t-2 border-gray-300'>
                <div className='flex gap-1.5 flex-col'>
                    <h2 className='text-gray-400'>Kasir</h2>
                    <p>Adit</p>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <p className='text-gray-400'>Metode Pembayaran</p>
                    <p >Cash</p>
                </div>


                <div className='flex flex-col gap-1.5'>
                    <h2 className='text-gray-400'>Total</h2>
                    <p>163.000</p>
                </div>
            </div>
        </div>
    )
}