import { productUseCase } from "@/di/modules";
import { Product, Stock } from "@/lib/types/product";
import { productStockSchema } from "@/lib/validations/stock";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useStock() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [openStockEditor, setOpenStockEditor] = useState(false)
    const [stockProduct, setStockProduct] = useState<Product | null>(null)
    const [stockQuantity, setStockQuantity] = useState<number>(0)
    const stockForm = useForm({
        resolver: zodResolver(productStockSchema),
        defaultValues: {
            product_id: "",
            current_stock: "0"
        }
    });
    useEffect(() => {
        async function initStock() {
            const stocks = await productUseCase.initStocks();
            setStocks(stocks.data || []);
        }
        initStock();
    }, []);
    function changeStockEditor(prod: Product) {

        setStockProduct(prod)

        const found = stocks.find((s) => s.product_id === prod.id)
        setStockQuantity(found ? found.current_stock : 0)
        setOpenStockEditor(true)
    }
    return { stockForm, stocks, setStocks, openStockEditor, setOpenStockEditor, stockProduct, setStockProduct, stockQuantity, setStockQuantity, changeStockEditor };

}