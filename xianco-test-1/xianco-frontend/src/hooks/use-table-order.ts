import { Order, OrderStatus, PaymentMethod } from "@/lib/types/order";
import { useMemo, useState } from "react";

export function useTableOrder(data: { orders: Order[], paymentMethods: PaymentMethod[], orderStatuses: OrderStatus[] }) {
    const { orders, paymentMethods, orderStatuses } = data;
    const [query, setQuery] = useState("")
    const [filterInStock, setFilterInStock] = useState("all") // Menyimpan ID Payment Method atau "all"
    const [page, setPage] = useState(1)
    const pageSize = 5;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()

        // 1. Lakukan Filtering
        const result = orders?.filter((p) => {
            // --- SEARCH LOGIC (SAFE) ---
            // Gunakan "|| ''" untuk mencegah error jika datanya null/undefined
            const orderNum = (p.order_number || "").toLowerCase();
            const custName = (p.customer_name || "").toLowerCase();

            const matchesSearch = !q || orderNum.includes(q) || custName.includes(q);
            if (!matchesSearch) return false;

            // --- FILTER LOGIC (BY ID) ---
            // Bandingkan payment_method_id (dari data) dengan filterInStock (ID dari dropdown)
            if (filterInStock !== "all") {
                // Pastikan keduanya string agar perbandingan aman (misal: 1 vs "1")
                if (String(p.payment_method_id) !== String(filterInStock)) {
                    return false;
                }
            }

            return true;
        });

        // 2. Lakukan Mapping (ID ke Nama) pada HASIL filter saja
        // Kita gunakan .map untuk membuat object BARU agar data asli 'orders' tidak termutasi/rusak
        return result.map(p => {
            const payment = paymentMethods.find((s) => String(s.id) === String(p.payment_method_id));
            const status = orderStatuses.find((s) => String(s.id) === String(p.order_status_id));

            return {
                ...p,
                // Timpa field payment_method & order_status dengan Nama yang sudah dicari
                payment_method: payment ? payment.name : p.payment_method,
                order_status: status ? status.name : p.order_status
            };
        });

    }, [orders, paymentMethods, orderStatuses, query, filterInStock])

    const pageCount = Math.max(1, Math.ceil((filtered?.length || 0) / pageSize))
    const pageItems = filtered?.slice((page - 1) * pageSize, page * pageSize)

    return { query, setQuery, filterInStock, setFilterInStock, page, setPage, pageSize, pageCount, pageItems, filtered }
}