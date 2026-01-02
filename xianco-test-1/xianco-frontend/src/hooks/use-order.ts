import { orderUseCase, productUseCase } from "@/di/modules";
import { Customer, Order, OrderStatus, PaymentMethod, PaymentStatus, PostOrder } from "@/lib/types/order";
import { Product } from "@/lib/types/product";
import { saveOrderSchema } from "@/lib/validations/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export function useOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
    const [paymentStatuses, setPaymentStatuses] = useState<PaymentStatus[]>([]);
    const [editing, setEditing] = useState<PostOrder | null>(null);
    const [openEdit, setOpenEdit] = useState(false);


    const form = useForm({
        resolver: zodResolver(saveOrderSchema),
        defaultValues: {
            id: "",
            customer_id: "",
            payment_method_id: "",
            payment_status_id: "",
            order_status_id: "",
            order_item: [{ product_id: "", quantity: "", price: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_item"
    });

    useEffect(() => {
        async function fetchData() {
            const [fetchedOrders, fetchedProducts, fetchedCustomers, fetchedOrderStatuses, fetchedPaymentMethods, fetchedPaymentStatuses] = await Promise.all([
                orderUseCase.getAllOrders(),
                productUseCase.initProducts(),
                orderUseCase.getCustomers(),
                orderUseCase.getOrderStatuses(),
                orderUseCase.getPaymentMethods(),
                orderUseCase.getPaymentStatuses()
            ]);

            setOrders(fetchedOrders.data || []);
            setProducts(fetchedProducts.data || []);
            setCustomers(fetchedCustomers.data || []);
            setOrderStatuses(fetchedOrderStatuses.data || []);
            setPaymentMethods(fetchedPaymentMethods.data || []);
            setPaymentStatuses(fetchedPaymentStatuses.data || []);
        }
        fetchData();
    }, []);

    function openCreate() {
        setEditing({
            id: "",
            customer_id: "",
            customer_name: "",
            payment_method_id: "",
            payment_method: "",
            order_status_id: "",
            order_status: "",
            payment_status_id: "",
            payment_status: "",
            total_price: "",
            order_item: []
        });
        form.reset({
            id: "",
            customer_id: "",
            payment_method_id: "",
            payment_status_id: "",
            order_status_id: "",
            order_item: [{ product_id: "", quantity: "", price: "" }]
        });
        setOpenEdit(true);
    }

    function handleEdit(order: Order) {
        setEditing({
            id: order.id,
            customer_id: order.customer_id,
            customer_name: order.customer_name,
            payment_method_id: order.payment_method_id.toString(),
            payment_method: order.payment_method,
            order_status_id: order.order_status_id.toString(),
            order_status: order.order_status,
            payment_status_id: order.payment_status_id.toString(),
            payment_status: order.payment_status,
            order_item: order.order_item,
            total_price: order.total_price,
        });
        form.reset({
            id: order.id,
            customer_id: order.customer_id,
            payment_method_id: order.payment_method_id,
            payment_status_id: order.payment_status_id,
            order_status_id: order.order_status_id,
            order_item: order.order_item.map(i => ({
                productId: i.product_id,
                quantity: i.quantity,
                price: i.price
            }))
        });
        setOpenEdit(true);
    }

    return {
        form,
        fields,
        append,
        remove,
        orders,
        products,
        setOrders,
        editing,
        setEditing,
        openEdit,
        setOpenEdit,
        openCreate,
        handleEdit,
        customers,
        paymentMethods,
        orderStatuses,
        paymentStatuses
    };
}