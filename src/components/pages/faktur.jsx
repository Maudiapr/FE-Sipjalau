import {Clock} from '../pages/clock'
import { Header } from '../layout/headerLayout'
import { months } from '../data/data'
import { dataFaktur } from '../data/data'
import { useState } from 'react'
import { DetailFaktur } from './detailFaktur'
import { Search } from 'lucide-react'

export const Faktur = () => {
    const [openDetailFaktur, setOpenDetailFaktur] = useState(false)

    const startYear = 2026
    const currentYear = new Date().getFullYear()

    const years = Array.from({length: currentYear - startYear + 1 }, (_, i) => startYear + i)
    return(
        <div>
            <Header
                title = "Faktur"
                subtitle = "Riwayat faktur terbaru | Periode"
                left = <Clock/>
                right = {
                        <div className='flex gap-2.5 justify-end h-9'>
                            <div className='relative text-center'>
                                <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'/>
                                <input type="text" name="searchFaktur" placeholder='Cari' className='border w-80 border-gray-200 bg-white rounded-sm pl-10 p-1.5'/>
                            </div>

                            <div className='flex gap-2'>
                                <select name="monthSelected" className='border border-gray-200 bg-white rounded-sm p-2 w-50'>
                                    {months.map((data) => (
                                        <option key={data.id} value={data.label}>{data.label}</option>
                                    ))}
                                </select>

                                <select name="yearSelected" className='border border-gray-200 bg-white rounded-sm p-2 w-50'>
                                    {years.map((year) => (
                                        <option key={year}  value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                }  
                classNameLeft = "flex justify-between w-full"
                classNameRight = "flex justify-end w-full"
            />

            <div className='mt-6 border-2 border-gray-300 bg-[#E5EDFA] flex flex-col gap-6'>
                <div className='max-h-135 overflow-y-auto scrollbar-thin'>
                    <table className='w-full text-center '>
                        <thead className='text-gray-500 text-sm bg-[#E5EDFA] sticky top-0'>
                            <tr>
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
            {openDetailFaktur && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <DetailFaktur onClose={() => setOpenDetailFaktur(false)} />
                </div>
            )}
        </div> 
    )
}