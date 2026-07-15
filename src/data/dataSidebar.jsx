    import {LayoutGrid, ShoppingCart, File} from 'lucide-react'

    export const DataSidebar = [
        {
            index : 1, 
            Icon : LayoutGrid,
            title : "Dashboard",
            path : "/",
            role : ["cashier", "manager"]
        },
        {
            index : 2, 
            Icon : ShoppingCart,
            title : "Order",
            path : "/order",
            role : ["cashier", "manager"]
        },
        {
            index : 3, 
            Icon : File,
            title : "Faktur",
            path : "/faktur",
            role : ["manager"]
        }
    ]