import {X, Circle} from "lucide-react"
import { useEffect, useState } from "react"
import { getOrderDetail } from "../api/service"


export const DetailFaktur = ({onClose, orderId}) => {

    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getOrderDetail(orderId)
                setOrder(data)
            } catch (error) {
                console.error(error)
            }
        }

        if (orderId) {
            fetchDetail()
        }

    }, [orderId])

    if (!order) return null

    const timeline = [
        {
            id: 1,
            title: "Diterima",
            date: order.receivedAt,
        },
        {
            id: 2,
            title: "Selesai Dicuci",
            date: order.estimatedDoneAt,
        },
        {
            id: 3,
            title: "Selesai",
            date: order.completedAt,
        },
        {
            id: 4,
            title: "Diambil",
            date: order.pickedUpAt,
        },
    ]

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    return(
        <div className="text-sm font-inter w-140 max-h-[90vh] flex flex-col overflow-y-auto scrollbar-thin bg-white rounded-xl">
            <div className="flex justify-between p-4 sticky top-0 bg-white border-b-2 border-gray-200">
                <div className='flex flex-col'>
                    <h2>{order.invoiceNumber}</h2>
                    <p className=' text-gray-400'>Diterima : {new Date(order.receivedAt).toLocaleDateString('id-ID')}</p>
                </div>
                    <button onClick={onClose}><X/></button>
            </div>

            <div className='p-4'>
                <h1 className='text-gray-400'>STATUS PESANAN</h1>
            </div>

            <hr className="border border-gray-100"/> 

            <div className='flex flex-col gap-2.5 p-4'>
                <h1 className='text-gray-400'>PELANGGAN</h1>

                <div className='flex flex-col justify-between gap-1'>
                    <div className="flex flex-col  gap-2.5">
                        <h2 className='font-semibold'>{order.customer.fullname}</h2>
                        <p className=' text-gray-400'><span>☎</span>{order.customer.phoneNumber}</p>
                    </div>
                    
                    <div className="flex gap-2.5">
                        <p className='bg-blue-200 w-fit p-2 rounded-lg text-blue-600'>{order.turnaroundType === "ekspres" ? "Express" : "Reguler"}</p>
                        <p className="bg-green-200 rounded-lg text-green-600 p-2">Lunas</p>
                    </div>
                </div>

            <div className="border border-gray-300 rounded-xl bg-gray-100 p-3 min-h-15">
                    {order.notes || "-"}
                </div>
            </div>

            <hr className="border border-gray-100"/> 
            
            <div className='p-4 gap-2.5 flex flex-col'>
                <h1 className='text-gray-400'>ITEM PESANAN</h1>

                <div className="grid grid-cols-12 gap-4 pb-3  font-medium text-gray-400">
                    <div className='col-span-7'>Layanan</div>
                    <div className='col-span-2'>Qty/Kg</div>
                    <div className='col-span-3 text-center'>Harga</div>
                </div>
                {order.items.map((data) => (
                    <div key={data.id} className="grid grid-cols-12 gap-4 py-2.5 border-t border-gray-200">
                        <div className="col-span-7">
                            <div className='flex gap-1 flex-col'>
                                <p className="font-semibold text-md">{data.service.name}</p>
                                <p className='bg-gray-200 text-gray-400 w-fit p-1.5 rounded-md border  border-gray-200'>{data.service.itemCategory}</p>
                            </div>
                        </div>

                        <div className="col-span-2 text-gray-400"><p>{data.measurement.value} {data.measurement.type === "quantity" ? "Kg" : data.measurement.type === "length" ? "Meter" : "Pcs"}</p></div>

                        <div className="col-span-3 flex justify-end text-gray-600"><p>Rp {Number(data.subtotal).toLocaleString("id-ID")}</p></div>
                    </div>
                ))}
            </div>

            <hr className="border border-gray-100"/> 

            <div className='p-4 flex flex-col gap-2.5'>
                <h1 className='text-gray-400'>TIMELINE</h1>

                <div className="flex gap-1 justify-center items-center">
                    {timeline.map((data) => (
                        <div key={data.id} className="flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-xl w-35 gap-2">
                        <div className="flex gap-1 items-center">
                                <Circle
                                    size={10}
                                    fill="#22C55E"
                                    stroke="#22C55E"
                                />

                                <p className="text-gray-400">{data.title}</p>
                        </div>

                        <p className={data.date? "text-black" : "text-gray-400"}>{formatDate(data.date)}</p>
                        </div>

                    ))}
                </div>
            </div>
            
            <div className='bg-gray-100 flex flex-col w-full border-t-2 border-gray-300'>
                <p className="mt-2.5 pl-2.5">
                    {order?.turnaroundType === "ekspres"
                        ? "Express"
                        : "Reguler"}
                    {" • "}
                    {order?.items[0].service.durationDays} Hari
                </p>

                <div className="flex gap-2.5 p-4 justify-between">
                    <div className='flex gap-1.5 flex-col'>
                        <h2 className='text-gray-400'>Kasir</h2>
                        <p>{order.cashier.name}</p>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                        <p className='text-gray-400'>Metode Pembayaran</p>
                        <p >{order.paymentMethod}</p>
                    </div>


                    <div className='flex flex-col gap-1.5'>
                        <h2 className='text-gray-400'>Total</h2>
                        <p>Rp {Number(order.total).toLocaleString("id-ID")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}