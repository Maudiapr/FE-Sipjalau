import {Clock} from '../components/clock'
import { Header } from '../layout/headerLayout'
import { months } from '../data/data'
import { useState, useEffect } from 'react'
import { DetailFaktur } from '../components/detailFaktur'
import { Search } from 'lucide-react'
import { getInvoices } from '../api/service'

export const Faktur = () => {
    const [openDetailFaktur, setOpenDetailFaktur] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    
    
    const now = new Date()
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [invoices, setInvoices] = useState([])

    const startYear = 2026
    const currentYear = new Date().getFullYear()


    {/* get data  be */}
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getInvoices(selectedMonth, selectedYear)

                console.log(response)

                setInvoices(response.data.invoices)
            } catch (error) {
                console.error(error)
            }
        };

        fetchInvoices();
    }, [selectedMonth, selectedYear])
    const years = Array.from({length: currentYear - startYear + 1 }, (_, i) => startYear + i)

    {/* Search */}
    const filteredInvoices = invoices.filter((invoice) => {
        const keyword = search.toLowerCase()

        return (
            invoice.invoiceNumber.toLowerCase().includes(keyword) ||
            invoice.customerName.toLowerCase().includes(keyword)
        )
    })

    const handleReset = () => {
        const now = new Date();

        setSearch("");
        setSelectedMonth(now.getMonth() + 1);
        setSelectedYear(now.getFullYear());
    }
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
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="searchFaktur" placeholder='Cari' className='border w-80 border-gray-200 bg-white rounded-sm pl-10 p-1.5'/>
                            </div>

                            <div className='flex gap-2'>
                                <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} name="monthSelected" className='border border-gray-200 bg-white rounded-sm p-2 w-50'>
                                    {months.map((data) => (
                                        <option key={data.id} value={data.id}>{data.label}</option>
                                    ))}
                                </select>

                                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} name="yearSelected" className='border border-gray-200 bg-white rounded-sm p-2 w-50'>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <button onClick={handleReset} className='bg-gray-500 flex items-center text-white p-2.5 rounded-sm'>Batal</button>
                            </div>
                        </div>
                }  
                classNameLeft = "flex justify-between w-full"
                classNameRight = "flex justify-end w-full"
            />

            {/* Main */}
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
                            {filteredInvoices.length > 0? (
                                filteredInvoices.map((data) => (
                                <tr key={data.orderId} className='border-b border-gray-300'>
                                    <td className="px-4 py-4 text-[#2E3F6D]">{data.invoiceNumber}</td>
                                    <td className="px-4 py-4 text-[#2E3F6D]">{data.customerName}</td>
                                    <td className="px-4 py-4 text-[#2E3F6D]">{new Date(data.orderDate).toLocaleDateString('id-ID')}</td>
                                    <td className="px-4 py-4 text-[#2E3F6D]">Rp {Number(data.total).toLocaleString("id-ID")}</td>
                                    <td><button onClick={() => {setSelectedOrderId(data.orderId) ; setOpenDetailFaktur(true)}} className='bg-[#A2B7E4] text-[#2E3F6D] rounded-2xl p-2 text-sm'>Lihat Detail</button></td>
                                </tr>
                            )) 
                            ): (
                                <tr>
                                    <td colSpan={5} className='py-12 text-center text-gray-500'>{search.trim() ? "Faktur yang dicari tidak ditemukan" : "Belum ada faktur pada periode yang dipilih"}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {openDetailFaktur && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <DetailFaktur orderId={selectedOrderId} onClose={() => setOpenDetailFaktur(false)} />
                </div>
            )}
        </div> 
    )
}