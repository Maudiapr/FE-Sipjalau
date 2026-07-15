import { useState, useEffect } from "react";
import { InputOrder } from "../components/inputOrder";
import { Header } from "../layout/headerLayout";
import { Clock } from "../components/clock";
import {Plus, Search, Check} from 'lucide-react'
import { DetailOrder } from "../components/detailOrder";
import { getOrders } from "../api/service";

export const Order = (  ) => {

    const [orders, setOrders] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [search, setSearch] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await getOrders();

            const sortedOrders = [...response.data.orders].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            setOrders(sortedOrders);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const [openInputOrder, setOpenInputOrder] = useState(false)
    const [openDetailOrder, setOpenDetailOrder] = useState(false)
    const [filterStatus, setFilterStatus] = useState("Semua")
        
    const filterCardOrder = orders.filter((order) => {
        const matchStatus =
            filterStatus === "Semua" || order.status === filterStatus;

        const matchSearch =
            (order.customer_name ?? "")
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchStatus && matchSearch;
    })

    {/* Format */}
    function formatEstimatedDate(date) {
        const tanggal = new Date(date);

        const hari = tanggal.toLocaleDateString("id-ID", {
            weekday: "short",
        });

        const tanggalBulan = tanggal.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });

        const jam = tanggal.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return `${hari}, ${tanggalBulan} · ${jam}`;
    }

    function formatStatus(status) {
        switch (status) {
            case "diproses":
                return {
                    text: "Menunggu Diproses",
                    className: "bg-gray-200 text-gray-600",
                };

            case "dicuci":
                return {
                    text: "Sedang Dicuci",
                    className: "bg-orange-200 text-orange-700",
                };

            case "siap_diambil":
                return {
                    text: "Siap Diambil",
                    className: "bg-green-200 text-green-700",
                };

            default:
                return {
                    text: status,
                    className: "bg-gray-100 text-gray-600",
                };
        }
    }

    const handleOrderCreated = async () => {
        setOpenInputOrder(false)

        await fetchOrders()
    };

    return(
        <div className="h-full  flex flex-col">
            <Header
                title = "Order" subtitle={`${filterCardOrder.length} order ditemukan`} 

                left =<Clock/>
                classNameLeft = "flex justify-between"

                right={
                    <div className="flex  justify-between items-center w-full">
                        <div className="flex gap-4 mt-2.5 mb-5">
                            <button onClick={() => setFilterStatus("Semua")} className={`p-2 rounded-lg w-fit ${filterStatus === "Semua" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Semua</button>
                            <button onClick={() => setFilterStatus("Menunggu Diproses")} className={`p-2 rounded-lg w-fit ${filterStatus === "Menunggu Diproses" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Menunggu Diproses</button>
                            <button onClick={() => setFilterStatus("Siap Diambil")} className={`p-2 rounded-lg w-fit ${filterStatus === "Siap Diambil" ? "bg-[#1E3A5F] text-white" : "bg-[#E5EDFA] text-[#2E3F6D]"}`}>Siap Diambil</button>
                        </div>

                        <div className="flex mr-2.5 gap-2.5 items-center">
                            <div className="relative">
                                <Search size={15} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari Order" name="searchOrder" className="bg-white w-70 h-10 rounded-xl pl-10" />  
                            </div>

                            <button onClick={() => setOpenInputOrder(true)} className=" p-2.5 bg-[#2C3E7A] flex rounded-lg justify-center items-center gap-2 h-10 w-fit text-white">
                                <Plus size={15}/>
                                <p className="text-sm"> Tambah Order</p>
                            </button>
                        </div>
                    </div>}
                classNameRight = "flex justify-between"
            />
            {openInputOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <InputOrder onClose={() => setOpenInputOrder(false)} onSuccess={handleOrderCreated}/>
                </div>
            )}

            {/* Main */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 items-center justify-center ">
                    {filterCardOrder.map((order) => (
                        <div key={order.id} className="border gap-2 flex flex-col justify-between bg-white h-fit rounded-lg border-gray-300 p-4 w-full max-w-100">
                            <div>
                                <div className=" flex justify-between">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg">{order.customer_name}</h1>
                                        <div className="flex gap-2.5 text-sm text-gray-400">
                                            <p>{order.invoice_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5  items-end">
                                        <h2 className={`text-xs p-1 rounded-lg ${formatStatus(order.status).className}`}>{formatStatus(order.status).text}</h2>
                                        <h2 className="bg-red-200 align-end text-xs w-fit p-1 h-fit rounded-lg">{order.turnaround_type === "reguler" ? "Reguler" : "Express"}</h2>
                                    </div>

                                </div>

                                <div className="border border-gray-100 w-full m-1.5"/>

                                <div className="flex justify-between text-sm mb-2.5 mt-2.5">
                                    <p className="text-gray-400">Estimasi Selesai</p>
                                    <h1 className="text-gray-00">{formatEstimatedDate(order.estimated_done_at)}</h1>
                                </div>

                                <div className="border border-gray-100 w-full m-1.5"/>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h3>Total</h3>
                                    <p className="text-lg">Rp. {Number(order.total).toLocaleString('id-ID')}</p>
                                </div>

                                <h3 className={`text-xs flex gap-2 items-center h-fit p-2.5 rounded-xl ${order.payment_status === "lunas" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} `}>
                                    {order.payment_status === "lunas" && <Check size={14} strokeWidth={3} />}
                                    {order.payment_status === "lunas" ? "Lunas" : "Belum Bayar"}
                                </h3>
                            </div>
                            <button key={order.id} className="border border-gray-300 text-gray-500 p-2.5 w-full rounded-lg" onClick={ () => {setSelectedOrderId(order.id); setOpenDetailOrder(true)}}>
                                Lihat Detail
                            </button>

                        </div>
                    ))}
                </div>
            </div>
            {openDetailOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <DetailOrder orderId = {selectedOrderId} onClose={() => setOpenDetailOrder(false)} onStatusUpdated={fetchOrders}/>
                </div>
            )}
        </div>
    )
}