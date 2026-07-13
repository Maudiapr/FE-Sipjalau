import {X} from 'lucide-react'
import { DataLayanan } from '../data/dataLayanan'
import { useState } from 'react'
import { Payment } from '../data/data'

export const InputOrder = ({onClose}) => {

    const [items, setItems] = useState([
        {
            id: 1,
            layanan: "",
            qty: 0,
            satuan: "Kg",
        },
    ])

    const AddItem = () => {
        setItems([
            ...items, 
            {
                id: Date.now(),
                layanan : "",
                qty : 0,
                satuan : "Kg"
            }
        ])
    }

    const DeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }
    
    const option = ["Regular", "Ekspres"]
    const [orderType, setOrderType] = useState(option[0])

    const [estimasi, setEstimasi] = useState(0);
    const handleEstimasi = (type) => {
        setOrderType(type)

        if(type === "Regular"){
            setEstimasi(3)
        } else {
            setEstimasi(2)
        }
    }    

    const  paymentStatus = [{
        id : 1,
        status : "Sudah Bayar"
    },
    {
        id: 2,
        status : "Belum Bayar"
    }]
    const [statusPayment, setStatusPayment] = useState("")
    return(
            <div className='font-inter text-sm w-140 border bg-white max-h-[90vh] border-gray-300 flex flex-col gap-4 overflow-y-auto scrollbar-thin scroll-smooth rounded-xl'>
                <div className='flex justify-between items-center p-2.5'>
                    <div>
                        <h1>Order Baru</h1>
                        <p className='text-gray-400'>INV akan dibuat otomatis</p>
                    </div>
                    <button onClick={onClose}><X className='text-gray-400'/></button>
                </div>

                <div className='border border-gray-200'/>

                <div className='flex flex-col gap-2.5 px-2.5'>
                    <h1 className='text-gray-400'>DATA PELANGGAN</h1>

                    <div className='flex justify-between text-gray-600 gap-2.5'>
                        <label htmlFor="custname" className='w-1/2'>
                            <p>Nama Pelanggan<span className="text-red-500">*</span></p>
                            <input type="text" name="custName" id="custname" placeholder='Nama Lengkap' className='w-full border border-gray-300 h-10 p-1 rounded-sm mt-1.5'/>
                        </label>
                        
                        <label htmlFor="custno" className='w-1/2'>
                            <p>No. HP<span className="text-red-500">*</span></p>
                            <input type="text" name="custNo" id="custno" placeholder='08xx-xxxx-xxxx' className='w-full border border-gray-300 h-10 p-1 rounded-sm mt-1.5'/>
                        </label>
                    </div>
                </div>

                <div className='border border-gray-200'/>
            
                <div className='px-2.5 flex flex-col gap-2.5'>
                    <div className='flex gap-1.5 flex-col'>
                        <h1 className='text-sm text-gray-400'>ITEM PESANAN</h1>

                        <div className=' flex justify-between'>
                            <div className={`flex rounded-xl border border-gray-400`}>
                                {option.map((opsi, index) => (
                                    <button key={opsi} onClick={() => handleEstimasi(opsi)} className={` text-xs p-2 gap-2 ${orderType === opsi ? "bg-blue-200 text-blue-500" : "bg-none text-gray-400"}
                                        ${index === 0 ? "rounded-l-xl border-r border-gray-400" : ""}
                                        ${index === option.length - 1 ? "rounded-r-xl" : ""}
                                    `}>{opsi}</button>
                                ))}
                            </div>

                            <p className='text-gray-400 text-xs mt-2'>Berlaku untuk semua item</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                        {items.map((item) => (
                            <div key={item.id} className='flex items-end gap-2.5 p-1 '>
                                <label htmlFor="layanan">
                                    <p className=' text-gray-400'>Layanan</p>
                                    <select name="layanan" className='border border-gray-300 h-9 rounded-xs p-1.5 w-70 text-gray-600 text-sm'>
                                        <option value="">Pilih Layanan...</option>
                                        {DataLayanan.map((data) => (
                                            <option key={data.id}>{data.nama}</option>
                                        ))}
                                    </select>
                                </label>

                                    <label htmlFor="weightlaun">
                                        <p className=' text-gray-400'>Qty/Kg</p>
                                        <input type="text" name="weightLaundry" id="weightlaun" placeholder='0' className=' rounded-xs w-25 p-1.5 border border-gray-300'/>
                                    </label>
                                    
                                    <label htmlFor="satuan">
                                        <p className=' text-gray-400'>Satuan</p>
                                        <input type="text" name="weightLaundry" id="weightlaun" placeholder='kg' readOnly className='rounded-xs w-15 p-1.5 border border-gray-300'/>
                                    </label>
        
                                    <button onClick={() => DeleteItem(item.id)} className="bg-white border border-gray-300 text-gray-400 font-light h-fit flex w-fit p-1.5 mb-1 rounded-sm justify-center items-center"><X size={15}/></button>
                            </div>
                        ))}

                        <button onClick={AddItem} className='border border-dashed border-gray-400 w-full p-2 mt-2.5 text-gray-400 rounded-xl'> + Tambah Item</button>   

                        <div className='flex justify-between bg-blue-200 p-2 rounded-xl h-10 items-center'>
                            <p className='text-blue-500'>Total Harga</p>
                            <p className='text-blue-900'>Rp. 0</p>
                        </div>
                    </div>  
                </div>

                <div className='border border-gray-200'/>

                <div className='flex flex-col p-2.5 gap-1.5'>
                    <h1 className='text-gray-400 text-sm'>PEMBAYARAN DAN PENCATATAN</h1>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-start gap-4'>
                            <label htmlFor="payment">
                                <p className=' text-gray-600'>Metode Pembayaran</p>
                                <select name="paymentMethode" id="payment" className='border rounded-lg border-gray-300 px-2.5 h-10 w-55 text-gray-600 text-sm'>
                                    {Payment.map((metode) => (
                                        <option>{metode.metode}</option>
                                    ))}
                                </select>
                            </label>

                            <div className='flex gap-1.5 flex-col'>
                                <p className='text-gray-600'>Estimasi</p>
                                <div className="grid w-25 h-9 grid-cols-2 rounded-2xl border justify-center border-gray-300">
                                    <div className="flex items-center justify-center">
                                        <p className=" font-semibold text-gray-600">{estimasi}</p>
                                    </div>

                                    <div className="flex items-center rounded-r-2xl justify-center border-l border-gray-300 bg-gray-50">
                                        <p className="font-medium text-gray-400">Hari</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2.5'>
                            <p className='text-sm text-gray-600'>Status Pembayaran<span className="text-red-500">*</span></p>
                            <div className=' flex gap-2.5 text-sm'>
                                {paymentStatus.map((status) => (
                                    <button key={status.id} type="button" onClick={() => setStatusPayment(status.status)} className={`p-2.5 w-1/2 rounded-lg ${statusPayment === status.status ? "bg-green-200 border border-green-600 text-green-700" : "bg-none border border-gray-00 text-gray-400"}`}>
                                        {status.status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="catatanPelanggan">
                                <p className='text-sm text-gray-600'>Catatan Order</p>
                                <textarea name="catatan" id="catatanPelanggan" placeholder='Catatan khusus dari pelanggan...' className='w-full rounded-sm border border-gray-300 p-1.5 placeholder:text-sm h-20 resize-none'/>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='flex bg-gray-100 gap-4 h-fit w-full p-2 pt-5 border-t border-gray-200'>
                    <button onClick={onClose} className='text-sm text-gray-700 border border-gray-500 bg-white p-2.5 rounded-lg w-[30%]'>Batal</button>
                    <button className='text-sm text-white border border-[#1D9E75] bg-[#1D9E75] p-2.5 rounded-lg w-[80%]'>Simpan Order</button>
                </div>
            </div>

    )
}