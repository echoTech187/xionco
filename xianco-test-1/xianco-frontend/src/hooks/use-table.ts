import { Product, Stock } from "@/lib/types/product";
import { useMemo, useState } from "react";

export function useTable(data: { products: Product[], stocks: Stock[] }) {
    const { products, stocks } = data;
    const [query, setQuery] = useState("")
    const [filterInStock, setFilterInStock] = useState("all")
    const [page, setPage] = useState(1)
    const pageSize = 5;

    const filtered = useMemo(() => { // Inferred different dependency than source.
        const q = query.trim().toLowerCase()

        return products?.filter((p) => {
            if (q && !(p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))) return false

            const stock = stocks.find((s) => s.product_id === p.id)?.current_stock ?? 0
            if (filterInStock === "instock") return stock > 0
            if (filterInStock === "out") return stock <= 0
            return true
        })
    }, [products, stocks, query, filterInStock])

    const pageCount = Math.max(1, Math.ceil((filtered?.length || 0) / pageSize))
    const pageItems = filtered?.slice((page - 1) * pageSize, page * pageSize)

    return { query, setQuery, filterInStock, setFilterInStock, page, setPage, pageSize, pageCount, pageItems, filtered }
}