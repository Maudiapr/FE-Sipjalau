import {X} from 'lucide-react'
import { InputField } from '../elements/inputField'
import { DataLayanan } from '../data/dataLayanan'
import { Label } from '../elements/label'
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
    
    
    return(
            <div className='w-130 border bg-white max-h-[90vh] border-gray-300 flex flex-col gap-4 overflow-auto scrollbar-none scroll-smooth rounded-xl'>
                <div className='flex justify-between items-center p-2.5'>
                    <div>
                        <h1>Order Baru</h1>
                        <p className='text-sm text-gray-400'>INV akan dibuat otomatis</p>
                    </div>
                    <button onClick={onClose}><X className='text-gray-400'/></button>
                </div>

                <div className='border border-gray-200'/>

                <div className='text-sm p-2.5'>
                    <h1 className='text-gray-400'>Data Pelanggan</h1>

                    <div className='flex justify-between text-gray-600'>
                        <InputField type="text" placeholder="Nama Lengkap" name="namaPelanggan" id="nama" htmlFor="nama" label="Nama Pelanggan" className="w-58"/>
                        <InputField type="text" placeholder="08777777777" name="nomorPelanggan" id="nomor" htmlFor="nomor" label="No.Hp" className="w-58"/>
                    </div>
                </div>

                <div className='border border-gray-200'/>
            
                <div className='p-2.5'>
                    <h1 className='text-sm'>Item Pesanan</h1>

                    <div>
                        {items.map((item) => (
                            <div key={item.id} className='flex items-center gap-2.5 p-1'>
                                <Label htmlFor="layanan">
                                    <p className='text-sm text-gray-400'>Layanan</p>
                                    <select name="layanan" className='border border-gray-300 p-1.5 w-70 text-gray-600 text-sm'>
                                        <option value="">Pilih Layanan...</option>
                                        {DataLayanan.map((data) => (
                                            <option key={data.id}>{data.nama}</option>
                                        ))}
                                    </select>
                                </Label>

                                <InputField type="text" placeholder="0" name="beratLaundry" id="berat" htmlFor="berat" label="Qty/Kg" className="w-15 text-gray-400 text-sm" classNameI="w-20 h-9" />
                                <InputField type="text" placeholder="Kg" name="satuan" id="satuan" htmlFor="satuan" label="Satuan" className="w-15 text-gray-400 text-sm" classNameI=" w-15 h-9 placeholder:text-sm" />
        
                                <button onClick={() => DeleteItem(item.id)} className="bg-white border border-gray-300 text-gray-400 font-light h-9 mt-7 flex w-10  justify-center items-center">X</button>

                            </div>
                        ))}

                        <button onClick={AddItem} className='border border-dashed border-gray-300 w-full p-2 mt-2.5 text-gray-400 rounded-xl'> + Tambah Item</button>   
                    </div>  
                </div>

                <div className='border border-gray-200'/>

                <div className='flex flex-col gap-2.5 p-2.5'>
                    <h1 className='text-gray-400 text-sm'>Pembayaran dan Catatan</h1>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1 flex-1'>

                            <Label htmlFor="payment">
                                <p className='text-sm text-gray-700'>Metode Pembayaran</p>
                                <select name="paymentMethode" id="payment" className='border border-gray-300 p-1.5 text-gray-600 text-sm'>
                                    {Payment.map((metode) => (
                                        <option>{metode.metode}</option>
                                    ))}
                                </select>
                            </Label>
                        </div>

                        <div>
                            <label htmlFor="estimasiWaktu">
                                <p className="w-fit flex-1 text-gray-700  text-sm">Estimasi Selesai</p>
                                <div className='relative'>
                                    <input type="text" name="estimasi" id="estimasiWaktu" className='p-1.5 border border-gray-300 mt-2 h-9 outline-none focus:border-blue-600'/>
                                    <span className=" flex items-center absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                                        Hari
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="catatanPelanggan">
                            <p className='text-sm text-gray-400'>Catatan Order</p>
                            <textarea name="catatan" id="catatanPeanggan" placeholder='Catatan khusus dari pelanggan...' className='border border-gray-300 p-1.5 placeholder:text-sm h-20 resize-none outline-none focus:border-blue-600'>

                            </textarea>
                        </Label>
                    </div>
                </div>

                <div className='flex bg-gray-100 p-2 pt-5 gap-2.5 border-t border-gray-200'>
                    <div className='flex gap-4 h-10 w-full'>
                        <button className='text-sm text-gray-700 border border-gray-500 bg-white p-2.5 rounded-lg w-[30%]'>Batal</button>
                        <button className='text-sm text-white border border-[#1D9E75] bg-[#1D9E75] p-2.5 rounded-lg w-[80%]'>Simpan Order</button>
                    </div>
                </div>
            </div>

    )
}