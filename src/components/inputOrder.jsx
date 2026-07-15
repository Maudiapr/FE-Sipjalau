import {X} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Payment } from '../data/data'
import { getServices } from '../api/service'
import { createOrder } from '../api/service'
import { toast } from 'sonner'
import { useRef } from 'react'


export const InputOrder = ({onClose, onSuccess}) => {
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [notes, setNotes] = useState("")


    {/* data services BE */}
    const [services, setServices] = useState([])
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchServices();
    }, []);
        
    {/* inisialisasi pesanan user */}
    const [items, setItems] = useState(() => [
        {
            id: Date.now(),
            service_id: "",
            qty: "",
            satuan: "",
            price : 0,
            total : 0,
        },
    ])

    const AddItem = () => {
        setItems((prevItems) => [
            ...prevItems, 
            {
                id: Date.now(),
                service_id : "",
                qty : "",
                satuan : "",
                price : 0,
                total : 0,
            }
        ])
    }

    const DeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const handleServiceChange = (itemId, serviceId) => {
        const service = services.find((service) => service.id === serviceId);

        if (!service) return;

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        service_id: service.id,
                        satuan: unitMap[service.pricing_unit] || "Kg",
                        price : service.price,
                        subtotal : (Number(item.qty) || 0 ) * Number(service.price)
                    }
                    : item
            )
        )

         // Hapus error jika service sudah dipilih
        if (serviceId) {
            setErrors((prev) => ({
                ...prev,
                service_id: undefined,
            }));
        }
    }

    const handleQtyChange = (itemId, qty) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        qty,
                        subtotal : Number(qty || 0 ) * Number(item.price)
                    }
                    : item
            )
        )

        // Hapus error kalo qty sudah valid
        if (Number(qty) > 0) {
            setErrors((prev) => ({
                ...prev,
                qty: undefined,
            }));
        }
    }
    
    {/* Status Service */}
    const option = ["Regular", "Ekspres"]
    const [orderType, setOrderType] = useState(option[0])

    {/* Estimasi selesai service auto fill */} 
    const [estimasi, setEstimasi] = useState(3);
    
    const handleEstimasi = (type) => {
        setOrderType(type)

        if(type === "Regular"){
            setEstimasi(3)
        } else {
            setEstimasi(2)
        }

        setItems((prev) => prev.map((item) => ({
            ...item,
            service_id : "",
            satuan : "",
            price : 0,
            total : 0
        })))
    }    

    const filteredServices = services.filter((service) => service.turnaround_type === (orderType === "Regular" ? "reguler" : "ekspres"))

    {/* Status payment */}
    const  paymentStatus = [{
        id : 1,
        status : "Sudah Bayar"
    },
    {
        id: 2,
        status : "Belum Bayar"
    }]
    const [statusPayment, setStatusPayment] = useState("")

    {/* Satuan Barang */}
    const unitMap = {
        per_kg: "Kg",
        per_barang: "Pcs",
        per_meter: "Meter",
    }

    const totalHarga = items.reduce((total, item) => total + Number(item.subtotal || 0), 0)

    {/* data post be */}
    const orderItems = items.map((item) => {
        const service = services.find(
            (service) => service.id === item.service_id
        );

        if (!service) return null;

        const orderItem = {
            serviceId: item.service_id,
        };

        switch (service.pricing_unit) {
            case "per_kg":
                orderItem.weight = Number(item.qty);
                break;

            case "per_meter":
                orderItem.length = Number(item.qty);
                break;

            case "per_barang":
                orderItem.quantity = Number(item.qty);
                break;
        }

        return orderItem;
    });

    // error state
    const [errors, setErrors] = useState({})

    const customerNameRef = useRef(null)
    const customerPhoneRef = useRef(null)
    const serviceRef = useRef(null)
    const qtyRef = useRef(null)

    const refs = {
        customerName: customerNameRef,
        customerPhone: customerPhoneRef,
        service: serviceRef,
        qty: qtyRef,
    }

    {/* sending data to be */}
    const handleSubmit = async () => {

        // validasi 
        const newErrors = {}

        if(customerName.trim().length <= 3){
            newErrors.customerName = "Minimal 3 karakter"
        }

        if (customerPhone.trim().length < 8){
            newErrors.customerPhone = "Minimal 8 angka"
        }

        if (!items[0].service_id){
             newErrors.service_id = "Pilih minimal 1 layanan"
        }

        if (!items[0].qty || Number(items[0].qty) <= 0){
            newErrors.qty = "Harus lebih dari 0"
        }

        setErrors(newErrors)

         const firstError = Object.keys(newErrors)[0];

        if (firstError) {
            refs[firstError]?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            refs[firstError]?.current?.focus();

            return
        }

        try{
            const payload = {
                customer: {
                    fullname : customerName,
                    phoneNumber : customerPhone
                },
                turnaroundType: orderType === "Regular" ? "reguler" : "ekspres",
                paymentStatus : statusPayment === "Sudah Bayar" ? "lunas" : "belum_bayar",
                paymentMethod : statusPayment === "Sudah Bayar" ? paymentMethod : null,
                notes, 
                items : orderItems
            }
            console.log(payload)

            const result = await createOrder(payload)
            if (onSuccess) {
                onSuccess();
            }
            toast.success("Pesanan berhasil dibuat", {duration : 1000})
            console.log(result)
        } catch (err) {
            toast.error(err.message || "Pesanan gagal dibuat", {duration: 2000})
            console.log(err)
        }
    }

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
                            <input type="text" name="custName" value={customerName} onChange={(e) => {
                                const value = e.target.value;
                                setCustomerName(value);

                                if (value.trim().length >= 3) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        customerName: undefined,
                                    }));
                                }
                                }} ref={customerNameRef} id="custname" placeholder='Nama Lengkap' className={`w-full border h-10 p-1 rounded-sm mt-1.5 ${errors.customerName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border border-gray-300 "}`}/>
                            {errors.customerName && ( 
                                <p className='text-xs text-red-500 mt-1'>{errors.customerName}</p>
                            )}
                        </label>
                        
                        <label htmlFor="custno" className='w-1/2'>
                            <p>No. HP<span className="text-red-500">*</span></p>
                            <input type="text" value={customerPhone} onChange={(e) => {
                                const value = e.target.value;
                                setCustomerPhone(value);

                                if (value.trim().length >= 8) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        customerPhone: undefined,
                                    }));
                                }

                                }} ref={customerPhoneRef} name="custNo" id="custno" placeholder='08xx-xxxx-xxxx' className={`w-full border h-10 p-1 rounded-sm mt-1.5 ${errors.customerPhone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border border-gray-300 "}`}
                            />
                            {errors.customerPhone && ( 
                                <p className='text-xs text-red-500 mt-1'>{errors.customerPhone}</p>
                            )}
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

                    <div className='flex flex-col gap-2.5 mb-2.5'>
                        {items.map((item) => (
                            <div key={item.id} className='flex items-start gap-2.5 p-1 '>
                                <label htmlFor="layanan">
                                    <p className=' text-gray-400'>Layanan</p>
                                    <select name="layanan" value={item.service_id} onChange={(e) => handleServiceChange(item.id, e.target.value)} ref={serviceRef} className={`border h-9 rounded-xs p-1.5 w-70 text-gray-600 text-sm ${errors.service_id ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border border-gray-300"}`}>
                                        <option value="">Pilih Layanan...</option>
                                        {filteredServices.map((data) => (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                    {errors.service_id && ( 
                                            <p className='text-xs text-red-500 mt-1'>{errors.service_id}</p>
                                        )}
                                </label>

                                    <label htmlFor="weightlaun">
                                        <p className=' text-gray-400'>Qty</p>
                                        <input type="text" value={item.qty} onChange={(e) => handleQtyChange(item.id, e.target.value)} ref={qtyRef} name="weightLaundry" id="weightlaun" placeholder='0' className={`rounded-xs w-25 p-1.5 border  ${errors.qty? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border border-gray-300"}`}/>
                                        {errors.qty && ( 
                                            <p className='text-xs text-red-500 mt-1'>{errors.qty}</p>
                                        )}
                                    </label>
                                    
                                    <label htmlFor="satuan">
                                        <p className=' text-gray-400'>Satuan</p>
                                        <input type="text" value={item.satuan} name="weightLaundry" id="weightlaun" placeholder='kg' readOnly className='rounded-xs text-gray-400 w-15 p-1.5 border border-gray-300'/>
                                    </label>
        
                                    <button onClick={() => DeleteItem(item.id)} className="bg-white border border-gray-300 text-gray-400 font-light h-fit flex w-fit p-1.5 mt-5.5 rounded-sm justify-center items-center">
                                        <X size={15}/>
                                    </button>
                            </div>
                        ))}

                        <button onClick={AddItem} className='border border-dashed border-gray-400 w-full p-2 mt-2.5 text-gray-400 rounded-xl'> + Tambah Item</button>   

                        <div className='flex justify-between bg-blue-200 p-2 rounded-xl h-10 items-center'>
                            <p className='text-blue-500'>Total Harga</p>
                            <p className='text-blue-900'>Rp. {totalHarga.toLocaleString('id-ID')}</p>
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
                                <select value={paymentMethod} disabled={statusPayment === "Belum Bayar"} onChange={(e) => setPaymentMethod(e.target.value)} name="paymentMethode" id="payment" className='border rounded-lg border-gray-300 px-2.5 h-10 w-55 text-gray-600 text-sm'>
                                    <option value="" disabled>Pilih metode pembayaran</option>
                                    {Payment.map((metode) => (
                                        <option key={metode.value} value={metode.value}>{metode.label}</option>
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
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} name="catatan" id="catatanPelanggan" placeholder='Catatan khusus dari pelanggan...' className='w-full rounded-sm border border-gray-300 p-1.5 placeholder:text-sm h-20 resize-none'/>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='flex bg-gray-100 gap-4 h-fit w-full p-2 pt-5 border-t border-gray-200'>
                    <button onClick={onClose} className='text-sm text-gray-700 border border-gray-500 bg-white p-2.5 rounded-lg w-[30%]'>Batal</button>
                    <button onClick={handleSubmit} className='text-sm text-white border border-[#1D9E75] bg-[#1D9E75] p-2.5 rounded-lg w-[80%]'>Simpan Order</button>
                </div>
            </div>

            

    )
}