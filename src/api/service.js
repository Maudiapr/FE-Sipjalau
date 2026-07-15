import { apiFetch } from "./index"

export async function getServices() {
    const response = await apiFetch("/services")
    return response.data;
}

export async function createOrder(payload){
    return apiFetch("/orders", {
        method: "POST",
        body : JSON.stringify(payload)
    })
}

export async function getOrders() {
    return apiFetch("/orders")
}


export const getOrderDetail = async (id) => {
    const response = await apiFetch(`/orders/${id}`)
    return response.data.order
}

export async function getDashboard() {
    return await apiFetch("/dashboard");
}

export async function updateOrderStatus(orderId, status) {
    return await apiFetch(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
            status,
        }),
    })
}

export async function updateOrderPayment(orderId, paymentMethod) {
    return await apiFetch(`/orders/${orderId}/payment`, {
        method: "PATCH",
        body: JSON.stringify({
            paymentMethod,
        }),
    })
}


export async function getInvoices(month, year) {
    return await apiFetch(`/invoices?month=${month}&year=${year}`);
}