import {X, Circle, TriangleAlert, LoaderCircle} from 'lucide-react' 
import {Payment} from '../data/data'
import {Toaster, toast} from 'sonner'
import { useState, useEffect } from 'react'
import { getOrderDetail } from '../api/service'
import { updateOrderStatus } from '../api/service'
import { updateOrderPayment } from '../api/service'


export const DetailOrder = ({onClose, orderId, onStatusUpdated}) => {
    const [paymentMethod, setPaymentMethod] = useState("")
    const [order, setOrder] = useState(null)

    {/* get data be */}
    useEffect(() => {
        if (!orderId) return

        const fetchDetail = async () => {
            try {
                const data = await getOrderDetail(orderId);
                setOrder(data)
            } catch (error) {
                console.error(error)
            }
        };

        fetchDetail()
    }, [orderId])

    if (!order) {
        return (
            <div className="bg-white flex gap-2.5 rounded-xl p-10">
                <LoaderCircle className='animate-spin'/>
                <p>Loading...</p>
            </div>
        )
    }

    {/* Next Status */}
    const nextStatusValue = {
        diproses: "sedang_dicuci",
        sedang_dicuci: "siap_diambil",
        siap_diambil: "sudah_diambil",
    }

    const handleNextStatus = async () => {
        try {
            const nextStatus = nextStatusValue[order.status]

            if (!nextStatus){
                toast.error("Status tidak dapat di perbaharui")
                return
            }

            await updateOrderStatus(orderId, nextStatus)

            const data = await getOrderDetail(orderId);
            setOrder(data);

            onStatusUpdated?.();

            toast.success("Status berhasil diperbarui");

        } catch (err) {
            toast.error(err.message);
        }
    }


    const handleConfirm = () => {
        if (!paymentMethod) {
            toast.error("Silakan pilih metode pembayaran");
            return;
        }

        toast.custom((id) => (
            <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                <div className="flex flex-col gap-2.5 justify-center items-center">
                    <TriangleAlert className="w-10 h-10 text-yellow-500" />
                    <h3 className="font-semibold text-lg text-center">
                        Konfirmasi Pembayaran?
                    </h3>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="px-3 py-2 border border-gray-400 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => toast.dismiss(id)}
                    >
                        Batal
                    </button>

                    <button
                        className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        onClick={async () => {
                            try {
                                await updateOrderPayment(orderId, paymentMethod);

                                const data = await getOrderDetail(orderId);
                                setOrder(data);

                                onStatusUpdated?.();

                                toast.dismiss(id);
                                toast.success("Pembayaran berhasil dikonfirmasi");
                            } catch (err) {
                                toast.dismiss(id);
                                toast.error(err.message);
                            }
                        }}
                    >
                        Ya
                    </button>
                </div>
            </div>
        ));
    };

    const isPaid = order.paymentStatus === "lunas"

    {/* timeline order */}
    const timeline = [
        {
            id: 1,
            title: "Diterima",
            date: order.receivedAt,
            completed: true,
        },
        {
            id: 2,
            title: "Selesai Dicuci",
            date:
            order.status === "sedang_dicuci" ||
            order.status === "siap_diambil" ||
            order.status === "sudah_diambil"
                ? order.estimatedDoneAt
                : null,
            completed:
                order.status === "sedang_dicuci" ||
                order.status === "siap_diambil" ||
                order.status === "sudah_diambil",
        },
        {
            id: 3,
            title: "Selesai",
            date: order.completedAt,
            completed: !!order.completedAt,
        },
        {
            id: 4,
            title: "Diambil",
            date: order.pickedUpAt,
            completed: !!order.pickedUpAt,
        },
    ]

    const formatTimelineDate = (date) => {
        if (!date) return "—"

        return new Date(date).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    const nextStatus = {
        diproses: {
            title: "Lanjut ke tahap berikutnya?",
            description: "Menunggu Diproses → Sedang Dicuci",
            button: "Mulai Cuci",
        },
        sedang_dicuci: {
            title: "Lanjut ke tahap berikutnya?",
            description: "Sedang Dicuci → Siap Diambil",
            button: "Tandai Selesai Dicuci",
        },
        siap_diambil: {
            title: "Lanjut ke tahap berikutnya?",
            description: "Siap Diambil → Sudah Diambil",
            button: "Tandai Sudah Diambil",
        },
        sudah_diambil: {
            title: "Pesanan sudah selesai",
            description: "Order telah selesai.",
            button: null,
        },
    }
    const currentStatus = nextStatus[order.status];
    return(
        <div className='font-inter flex flex-col w-140 mx-2 bg-white overflow-y-auto max-h-[90vh] scrollbar-thin rounded-xl'>
             {/* Header */}
            <div className='flex justify-between p-2.5 sticky top-0 bg-white border-b-2 border-gray-200'>
                <div className='flex flex-col'>
                    <h2 className='text-lg'>{order.invoiceNumber}</h2>
                    <p className='text-sm text-gray-400'>Diterima: {new Date(order.receivedAt).toLocaleDateString("id-ID")}</p>
                </div>

                <button onClick={onClose}><X/></button>
            </div>

            <hr className="border border-gray-100"/> 

            <div className='p-2.5'>
                <h1 className='text-gray-400 text-sm'>STATUS PESANAN</h1>
            </div>

            <div className='bg-orange-100 text-orange-900 w-full p-2.5 border-t border-b border-gray-300'>
                <div className='flex justify-between '>
                    <div className='flex flex-col gap-1.5'>
                        <h2 className='font-semibold'>{currentStatus.title}</h2>
                        <p className='text-xs'>{currentStatus.description}</p>
                    </div>

                    {currentStatus.button && (
                        <button onClick={handleNextStatus} className='bg-orange-400 text-white text-sm p-2 rounded-xl h-fit'>{currentStatus.button}</button>
                    )}
                </div>
            </div>

            <hr className="border border-gray-100"/>

            <div className='flex flex-col p-2.5 gap-1'>
                <h1 className='text-gray-400 text-sm'>PELANGGAN</h1>

                <div className='flex flex-col gap-1'>
                    <h2 className='text-sm font-semibold'>{order.customer.fullname}</h2>
                    <p className='text-sm text-gray-400'><span>☎</span>{order.customer.phoneNumber}</p>
                    
                    <div className='flex gap-2'>
                        <p className='text-xs bg-blue-200 w-fit p-2 rounded-lg text-blue-600'>{order.items[0]?.service.turnaroundType === "reguler" ? "Reguler" : "Expres"}</p>
                        {order.paymentStatus === "lunas" ? 
                        <p className='text-xs bg-green-200 w-fit p-2 rounded-lg text-green-600'>Sudah Bayar</p> 
                        : 
                        (<p className='text-xs bg-red-200 w-fit p-2 rounded-lg text-red-600'>Belum Bayar</p>)}
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

                    {order.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200">
                            <div className="col-span-7">
                                <div className='flex gap-0.5 flex-col'>
                                    <p className="font-semibold text-md">{item.service.name}</p>
                                    <p className="text-gray-400 text-sm mt-1">{item.service.turnaroundType} • {item.service.pricingUnit} • {item.service.durationDays}</p>
                                    <p className='bg-gray-200 text-gray-400 w-fit p-1.5 rounded-md border text-xs border-gray-400'>{item.service.name}</p>
                                </div>
                            </div>

                            <div className="col-span-2 text-gray-400"><p>{item.measurement.value}{item.measurement.type === "quantity" ? "Kg" : item.measurement.type === "length" ? "Meter" : "Pcs"}</p></div>

                            <div className="col-span-3 flex justify-end text-gray-600"><p>Rp. {item.unitPrice.toLocaleString('id-ID')}</p></div>
                        </div>
                    ))}
                </div>
            </div>


            <div className='p-2.5 flex flex-col gap-1.5'>
                <h1 className='text-gray-400 text-sm'>TIMELINE</h1>

                <div className="flex text-xs gap-1 justify-center items-center">
                    {timeline.map((data) => (
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

                            <p className={data.date? "text-black" : "text-gray-400"}>{formatTimelineDate(data.date)}</p>
                        </div>

                    ))}
                </div>
            </div>

            <hr className="border border-gray-100"/>
            
            <div className='p-2.5 flex flex-col gap-2.5'>
                <h1 className='text-gray-400 text-sm'>CATATAN ORDER</h1>

                <div className='p-2 border border-gray-300 rounded-lg bg-gray-100 h-fit'>
                    <p className='text-sm text-gray-500'>{order.notes || '-'}</p>
                </div>
            </div>

            <div className='bg-gray-100 flex w-full gap-2.5 p-2.5 justify-between border-t-2 border-gray-300'>
                <div className='flex gap-8'>
                    <div className='flex gap-1.5 flex-col'>
                        <h2 className='text-gray-400 text-sm'>Kasir</h2>
                        <p className='text-sm'>{order.cashier.name}</p>
                    </div>

                    <div className='flex gap-2.5'>
                        <div className="w-px bg-gray-300"/>

                        {!isPaid ? (
                            <div className="flex gap-2.5 items-end text-sm justify-end">
                                <label htmlFor="payment">
                                    <p className='text-gray-400 text-sm'>Metode Pembayaran</p>
                                    <select name="layanan" value={paymentMethod} id="payment" onChange={(e) => setPaymentMethod(e.target.value)} className='border border-gray-500 text-gray-500 p-1.5 rounded-lg mt-1.5'>
                                        <option value="" disabled>Pilih metode pembayaran</option>
                                        {Payment.map((payment) => (
                                            <option key={payment.id} value={payment.value}>{payment.label}</option>
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
                                <p className='text-sm'>{order.paymentMethod}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <h2 className='text-gray-400 text-sm'>Total</h2>
                    <p>Rp {order.total.toLocaleString("id-ID")}</p>
                </div>
            </div>
        </div>
    )
}
