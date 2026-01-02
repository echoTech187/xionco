import { productUseCase } from "@/di/modules";
import { Product } from "@/lib/types/product";
import { saveProductSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useProduct() {

    const [products, setProducts] = useState<Product[]>([]);
    const [editing, setEditing] = useState<Product | null>(null)
    const [openEdit, setOpenEdit] = useState(false)
    const form = useForm({
        resolver: zodResolver(saveProductSchema),
        defaultValues: {
            id: "",
            sku: "",
            name: "",
            price: 0,
            description: "",
            category: "",
            image: ""
        }
    })
    useEffect(() => {
        async function initProducts() {
            const products = await productUseCase.initProducts();
            setProducts(products.data || []);
        }
        initProducts();
    }, []);
    function openCreate() {
        const newCode = ``;
        const newProduct = { id: "", sku: newCode, name: "", price: 0, description: "", category: "", image: "", current_stock: 0 };
        setEditing(newProduct);
        form.reset({
            id: "",
            sku: "",
            name: "",
            price: 0,
            description: "",
            category: "",
            image: ""
        });
        setOpenEdit(true)
    }
    return { form, products, setProducts, editing, setEditing, openEdit, setOpenEdit, openCreate };
}