// payment method
export const Payment = [
    {
        id : 1,
        metode : "Cash"
    },
    {
        id : 2,
        metode : "Qris"
    },
    {
        id : 3,
        metode : "Transfer"
    }
]


// data status
export const Status = {
    pending :{
        title : "Menunggu di proses",
        color : "bg-gray-200 text-xs p-1 h-fit rounded-lg"
    },
    washing :{
        title : "Sedang Dicuci",
        color : "bg-orange-200 text-xs p-1 h-fit rounded-lg"
    },
    ready :{
        title : "Siap Diambil",
        color : "bg-green-200 text-xs p-1 h-fit rounded-lg"
    },
    completed :{
        title : "Sudah Selesai",
        color : "bg-gray-200 text-xs p-1 h-fit rounded-lg"
    },
}

// data dummy items detail order
export const orderItems = [

    {
        id: 1,
        layanan: "Cuci Kering",
        kategori: "Regular",
        satuan: "Per kg",
        estimasi: "3 hari",
        label: "Pakaian",
        qty: "5 kg",
        harga: "Rp 20.000",
    },
    {
        id: 2,
        layanan: "Seterika Saja",
        kategori: "Regular",
        satuan: "Per pcs",
        estimasi: "3 hari",
        label: "Pakaian",
        qty: "2 kg",
        harga: "Rp 8.000",
    },
    {
        id: 3,
        layanan: "Cuci Sepatu",
        kategori: "Regular",
        satuan: "Per pasang",
        estimasi: "3 hari",
        label: "Sepatu",
        qty: "1 pasang",
        harga: "Rp 35.000",

    },
    ]
    
export const timelineOrder = [
    {
        id: 1,
        title: "Diterima",
        date: "25 Jun, 09:15",
        completed: true,
    },
    {
        id: 2,
        title: "Selesai Dicuci",
        date: "27 Jun, 17:00",
        completed: true,
    },
    {
        id: 3,
        title: "Selesai",
        date: null,
        completed: false,
    },
    {
        id: 4,
        title: "Diambil",
        date: null,
        completed: false,
    },
]

{/* Data Tahun dan BUlan */}

export const months = [
    { id: 1, label: "Januari" },
    { id: 2, label: "Februari" },
    { id: 3, label: "Maret" },
    { id: 4, label: "April" },
    { id: 5, label: "Mei" },
    { id: 6, label: "Juni" },
    { id: 7, label: "Juli" },
    { id: 8, label: "Agustus" },
    { id: 9, label: "September" },
    { id: 10, label: "Oktober" },
    { id: 11, label: "November" },
    { id: 12, label: "Desember" },
  ]

export const dataFaktur = [

    {
        id: 1,
        invoice: "INV-001",
        name: "Rian",
        date: "11 Juli 2026",
        total: 45000,
    },
    {
        id: 2,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 3,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 4,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 5,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 6,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 7,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 8,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 9,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 10,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 11,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 12,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
    {
        id: 13,
        invoice: "INV-002",
        name: "Budi",
        date: "11 Juli 2026",
        total: 35000,
    },
]

{/* Data Order */}
export const dataOrder = [
    {
        index : 1,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Lunas",
        pengambilan : "Antar ke Rumah",
        status : "Sedang Dicuci",
        tipe : "express"

    },
    {
        index : 2,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Lunas",
        pengambilan : "Antar ke Rumah",
        status : "Menunggu Diproses",
        tipe : "express"

    },
    {
        index : 3,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Belum Bayar",
        pengambilan : "Antar ke Rumah",
        status : "Sedang Dicuci",
        tipe : "express"

    },
    {
        index : 4,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Lunas",
        pengambilan : "Antar ke Rumah",
        status : "Siap Diambil",
        tipe : "express"

    },
    {
        index : 5,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Belum Bayar",
        pengambilan : "Antar ke Rumah",
        status : "Sedang Dicuci",
        tipe : "express"

    },
    {
        index : 6,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Belum Bayar",
        pengambilan : "Antar ke Rumah",
        status : "Sedang Dicuci",
        tipe : "express"

    },
    {
        index : 7,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Lunas",
        pengambilan : "Antar ke Rumah",
        status : "Menunggu Diproses",
        tipe : "express"

    },
    {
        index : 8,
        nama : "Budi Susanto",
        order : "#L-041",
        tanggal : "Rab, 1 Jul 2026",
        jam : "10:22",
        layanan : [
            {paket : "Paket Lengkap", kg : 3, harga: "16.500"},
            {paket : "Express Wash", kg : 1, harga : "12.000"},
            {paket : "Sepray Besar", kg : 2, harga : "24.000"}
        ],
        total : "52.000",
        keteranganPayment : "Lunas",
        pengambilan : "Antar ke Rumah",
        status : "Siap Diambil",
        tipe : "express"

    }

]