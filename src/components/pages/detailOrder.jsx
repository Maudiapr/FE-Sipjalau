import {X, Circle, TriangleAlert} from 'lucide-react' 
import { orderItems, Payment, timelineOrder } from '../data/data'
import {Toaster, toast} from 'sonner'
import { useState } from 'react'


export const DetailOrder = ({onClose}) => {
    const [confirmed, setConfirmed] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(Payment[0].metode)


    const handleConfirm = () => {
         toast.custom((id) => (
            <div className="bg-white rounded-lg shadow-lg p-4 w-80">

                <div className='flex flex-col gap-2.5 justify-center items-center'>
                    <TriangleAlert className="w-10 h-10 text-yellow-500"/>
                    <h3 className="font-semibold text-lg text-center">Konfirmasi Pembayaran?</h3>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-3 py-2 border border-gray-400 rounded bg-gray-200 hover:bg-gray-300" onClick={() => toast.dismiss(id)}>
                        Batal
                    </button>

                    <button className="px-3 py-2 border-gray-400 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => {
                        setConfirmed(true);
                        toast.dismiss(id);
                        toast.success("Pembayaran berhasil dikonfirmasi");
                    }}>
                        Ya
                    </button>
                </div>
            </div>
            ))

    }
    return(
        <div className='font-inter flex flex-col w-140 mx-2 bg-white overflow-y-auto max-h-[90vh] scrollbar-thin rounded-xl'>
             {/* Header */}
            <div className='flex justify-between p-2.5 sticky top-0 bg-white border-b-2 border-gray-200'>
                <div className='flex flex-col'>
                    <h2 className='text-lg'>INV-2025-039</h2>
                    <p className='text-sm text-gray-400'>Diterima: Rab, 3 Jul 2026 · 09:15</p>
                </div>

                <button onClick={onClose}><X/></button>
            </div>

            <hr className="border border-gray-100"/> 

            <div className='p-2.5'>
                <h1 className='text-gray-400 text-sm'>STATUS PESANAN</h1>
            </div>

            <div className='bg-orange-100 text-orange-900 w-full p-2.5 border-t border-b border-gray-300'>
                <div className='flex justify-between '>
                    <div>
                        <h2>Lanjut ke tahap berikutnya?</h2>
                        <p className='text-xs'>Sedang Dicuci → Siap Diambil</p>
                    </div>

                    <button className='bg-orange-400 text-white text-sm p-2 rounded-xl h-fit'>Tandai Selesai Dicuci</button>
                </div>
            </div>

            <hr className="border border-gray-100"/>

            <div className='flex flex-col p-2.5 gap-1'>
                <h1 className='text-gray-400 text-sm'>PELANGGAN</h1>

                <div className='flex flex-col gap-1'>
                    <h2 className='text-sm font-semibold'>Rina Wulandari</h2>
                    <p className='text-sm text-gray-400'><span>☎</span> 0812-3456-7890</p>
                    
                    <div className='flex gap-2'>
                        <p className='text-xs bg-blue-200 w-fit p-2 rounded-lg text-blue-600'>Express</p>
                        {!confirmed ? (<p className='text-xs bg-red-200 w-fit p-2 rounded-lg text-red-600'>Belum Bayar</p>) : 
                        <p className='text-xs bg-green-200 w-fit p-2 rounded-lg text-green-600'>Sudah Bayar</p>}
                    </div>
                </div>
            </div>

            <hr className="border border-gray-100"/> 

            <div className='p-2.5 flex flex-col gap-5'>
                <h1 className='text-gray-400 text-sm'>ITEM PESANAN</h1>

                <div className='flex flex-col text-sm'>
                    <div className="grid grid-cols-12 pb-3 border-b border-gray-100 text-gray-400">
                        <div className='col-span-7'>Layanan</div>
                        <div className='col-span-2'>Qty/Kg</div>
                        <div className='col-span-3 text-center'>Harga</div>
                    </div>

                    {orderItems.map((data) => (
                        <div key={data.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200">
                            <div className="col-span-7">
                                <div className='flex gap-0.5 flex-col'>
                                    <p className="font-semibold text-md">{data.layanan}</p>
                                    <p className="text-gray-400 text-sm mt-1">{data.kategori} • {data.satuan} • {data.estimasi}</p>
                                    <p className='bg-gray-200 text-gray-400 w-fit p-1.5 rounded-md border text-xs border-gray-400'>{data.label}</p>
                                </div>
                            </div>

                            <div className="col-span-2 text-gray-400"><p>{data.qty}</p></div>

                            <div className="col-span-3 flex justify-end text-gray-600"><p>{data.harga}</p></div>
                        </div>
                    ))}
                </div>
            </div>


            <div className='p-2.5 flex flex-col gap-1.5'>
                <h1 className='text-gray-400 text-sm'>TIMELINE</h1>

                <div className="flex text-xs gap-1 justify-center items-center">
                    {timelineOrder.map((data) => (
                        <div key={data.id} className="flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-xl w-30 gap-2">
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

            <hr className="border border-gray-100"/>
            
            <div className='p-2.5 flex flex-col gap-2.5'>
                <h1 className='text-gray-400 text-sm'>CATATAN ORDER</h1>

                <div className='p-2 border border-gray-300 rounded-lg bg-gray-100 h-fit'>
                    <p className='text-sm text-gray-500'>Keterangan</p>
                </div>
            </div>

            <div className='bg-gray-100 flex w-full gap-2.5 p-2.5 justify-between border-t-2 border-gray-300'>
                <div className='flex gap-8'>
                    <div className='flex gap-1.5 flex-col'>
                        <h2 className='text-gray-400 text-sm'>Kasir</h2>
                        <p className='text-sm'>Adit</p>
                    </div>

                    <div className='flex gap-2.5'>
                        <div className="w-px bg-gray-300"/>

                        {!confirmed  ? (
                            <div className="flex items-end text-sm justify-end">
                                <label htmlFor="payment">
                                    <p className='text-gray-400 text-sm'>Metode Pembayaran</p>
                                    <select name="layanan" id="payment" onChange={(e) => setPaymentMethod(e.target.value)} className='border border-gray-500 p-1.5 rounded-lg mt-1.5'>
                                        {Payment.map((payment) => (
                                            <option key={payment.id} value={payment.metode}>{payment.metode}</option>
                                        ))}
                                    </select>
                                </label>

                                <div className='bg-[#1D9E75] text-xs border rounded-xl border-gray-400'>
                                    <button onClick={handleConfirm} className='text-white p-2'>Konfirmasi</button>
                                    <Toaster position="top-center" />
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2.5'>
                                <p className='text-sm text-gray-400'>Metode Pembayaran</p>
                                <p className='text-sm'>{paymentMethod}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <h2 className='text-gray-400 text-sm'>Total</h2>
                    <p>163.000</p>
                </div>
            </div>
        </div>
    )
}
