"use client"

import { startTransition, useActionState, useEffect, useRef, useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Plus, Edit3, Trash2, Download, Upload, FileText } from "lucide-react"
import { useOrder } from "@/hooks/use-order"
import { deleteOrderAction, saveOrderAction } from "@/app/_action/orderAction"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { exportToExcel, parseExcelImport, generateInvoicePDF } from "@/lib/export"
import { Order, OrderItem } from "@/lib/types/order"
import { useTableOrder } from "@/hooks/use-table-order"

export default function OrderPage() {
    const [state, formAction, isPending] = useActionState(saveOrderAction, null)
    // Get data
    const {
        form, fields, append, remove,
        orders, products, editing,
        openEdit, setOpenEdit,
        openCreate, handleEdit,
        customers,
        paymentMethods,
        orderStatuses,
        paymentStatuses
    } = useOrder();

    const { query, setQuery, filterInStock, setFilterInStock, page, setPage, pageCount, pageItems, filtered } = useTableOrder({ orders, paymentMethods, orderStatuses });

    // // Custom States
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewData, setPreviewData] = useState<Order[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isCustomCustomer, setIsCustomCustomer] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isCustomPayment, setIsCustomPayment] = useState(false);


    useEffect(() => {
        const handleSuccess = () => {
            setOpenEdit(false);
            setIsPreviewOpen(false);
            window.location.reload();
        };
        function checkError() {
            if (state?.error) {
                toast.error(state.message, { description: state.error as string })
            } else if (state?.success) {
                toast.success(state.message, { description: state.description })
                handleSuccess()
            }
        }
        checkError()
    }, [state, setOpenEdit])

    // // --- Handlers ---

    async function handleDelete(id: string) {
        if (!confirm("Hapus pesanan ini?")) return
        await deleteOrderAction(null, id)
        window.location.reload()
    }

    const handleExport = () => {
        exportToExcel(orders);
        toast.success("Orders exported to Excel");
    }

    const handleImportClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const data = await parseExcelImport(file);
            toast.success(`Berhasil membaca ${data.length} baris data. (Simulasi Import)`);
            // Disini Anda bisa meloop data dan memanggil saveOrderAction atau API bulk insert
        } catch (error) {
            toast.error("Gagal membaca file Excel");
            console.error(error);
        }
    }

    const onPreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = form.getValues();

        const mappedItems = data.order_item.map((item: OrderItem) => {
            const prod = products.find(p => {
                return parseInt(p.id) === parseInt(item.product_id)
            });
            return {
                ...item,
                id: (Date.now()).toString() || "",
                product_id: item.product_id || "",
                productName: prod?.name || "",
                price: prod?.price.toString() || "0",
                amount: ((prod?.price || 0) * parseInt(item.quantity)).toString() || "0"
            } as OrderItem;
        });
        const total = mappedItems.reduce((acc, curr) => acc + (parseInt(curr.price) * parseInt(curr.quantity)), 0);

        setPreviewData([
            {
                ...data,
                customer_name: customers.find(c => parseInt(c.id) === parseInt(data.customer_id))?.name || "",
                order_status: orderStatuses.find(s => parseInt(s.id) === parseInt(data.order_status_id))?.name || "",
                payment_method: paymentMethods.find(m => parseInt(m.id) === parseInt(data.payment_method_id))?.name || "",
                payment_status: paymentStatuses.find(s => parseInt(s.id) === parseInt(data.payment_status_id))?.name || "",
                order_item: mappedItems,
                total_price: total.toString(),
                is_active: true,
                id: editing?.id || "", // Add this line
            }
        ]);
        setIsPreviewOpen(true);

    }

    const onConfirmSubmit = () => {

        // Hapus field helper jika ada
        const submissionData = previewData[0];


        const formData = new FormData();
        formData.append("payload", JSON.stringify(submissionData));
        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Orders</h1>
                <div className="flex gap-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />
                    <Button variant="outline" size="sm" onClick={handleImportClick}>
                        <Upload className="size-4 mr-2" /> Import
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="size-4 mr-2" /> Export
                    </Button>
                    <Input placeholder="Search by name or code" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} />
                    <Select
                        onValueChange={(v) => { setFilterInStock(v); setPage(1) }}
                        value={filterInStock}
                    >
                        <SelectTrigger size="sm">
                            <SelectValue placeholder="Pilih Metode Pembayaran">
                                {filterInStock === "all" ? "All" : paymentMethods.find(p => p.id.toString() === filterInStock)?.name || filterInStock}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {
                                paymentMethods.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button onClick={openCreate} size="sm">
                        <Plus className="size-4 mr-2" /> New Order
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageItems && pageItems.length > 0 ? orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium">{order.customer_name}</div>
                                        <div className="text-xs text-muted-foreground">{new Date(order.createdAt?.toString() || "").toLocaleDateString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={order.order_status.toLocaleUpperCase() === 'completed' ? 'default' : order.order_status.toLocaleUpperCase() === 'cancelled' ? 'destructive' : 'secondary'}>
                                            {order.order_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{order.payment_method}</div>
                                        <div className={`text-xs ${order.payment_status.toLocaleLowerCase() === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                                            {order.payment_status.toLocaleLowerCase()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">{order.order_item.length} Items</span>
                                    </TableCell>
                                    <TableCell>
                                        Rp. {(order.total_price || 0).toLocaleString('id-ID')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => generateInvoicePDF(order)} title="Print Invoice">
                                                <FileText className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(order)}>
                                                <Edit3 className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No orders.
                                    </TableCell>
                                </TableRow>
                            )
                            }
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Showing {pageItems.length} of {filtered?.length} products</div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</Button>
                            <div className="px-3">Page {page} / {pageCount}</div>
                            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page >= pageCount}>Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* PREVIEW DIALOG */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Pesanan</DialogTitle>
                        <DialogDescription>Mohon periksa kembali detail pesanan sebelum disimpan.</DialogDescription>
                    </DialogHeader>
                    {previewData.length > 0 && (
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div><strong>Customer:</strong> {previewData[0].customer_name}</div>
                                <div><strong>Method:</strong> {previewData[0].payment_method}</div>
                                <div><strong>Pay Status:</strong> {previewData[0].payment_status}</div>
                                <div><strong>Order Status:</strong> {previewData[0].order_status}</div>
                            </div>
                            <div className="border rounded p-2 bg-muted/20">
                                <p className="font-semibold mb-2">Items:</p>
                                {previewData[0].order_item.map((item: OrderItem, idx: number) => (
                                    <div key={idx} className="flex justify-between py-1 border-b last:border-0">
                                        <span>{item.quantity}x {item.productName}</span>
                                        <span>Rp {(parseInt(item.price) * parseInt(item.quantity)).toLocaleString('id-ID')}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-black">
                                    <span>Total Estimasi:</span>
                                    <span>Rp {parseInt(previewData[0].total_price).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Batal</Button>
                        <Button onClick={onConfirmSubmit} disabled={isPending}>
                            {isPending ? "Menyimpan..." : "Simpan Pesanan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* EDIT/CREATE DRAWER */}
            <Drawer open={openEdit} onOpenChange={setOpenEdit} direction="right">
                <DrawerContent className="h-full w-full sm:max-w-md xl:min-w-2xl ml-auto rounded-none border-l">
                    <DrawerHeader>
                        <DrawerTitle>{editing?.id ? "Edit Order" : "Create Order"}</DrawerTitle>
                        <DrawerDescription>Kelola detail pesanan.</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
                        <Form {...form}>
                            <form onSubmit={onPreSubmit} className="space-y-4">
                                <FormField control={form.control} name="id" render={({ field }) => <Input type="hidden" {...field} />} />

                                {/* CUSTOMER FIELD */}
                                <FormField
                                    control={form.control}
                                    name="customer_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Customer</FormLabel>

                                            <Select onValueChange={val => val === "NEW_CUSTOMER" ? setIsCustomCustomer(true) : field.onChange(val)} defaultValue={editing?.customer_id ? editing?.customer_id?.toString() : field.value as string}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Customer" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                                    <SelectItem value="NEW_CUSTOMER" className="font-bold text-blue-600">+ Tambah Customer Baru</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* PAYMENT METHOD FIELD */}
                                <FormField
                                    control={form.control}
                                    name="payment_method_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Metode Pembayaran</FormLabel>
                                            <Select onValueChange={(val) => {
                                                if (val === "NEW_METHOD") {
                                                    setIsCustomPayment(true);
                                                    field.onChange("");
                                                } else {
                                                    field.onChange(val);
                                                }
                                            }} defaultValue={editing?.payment_method_id ? editing?.payment_method_id?.toString() : field.value as unknown as string}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Metode" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {paymentMethods.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
                                                    <SelectItem value="NEW_METHOD" className="font-bold text-blue-600">+ Tambah Metode Baru</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="payment_status_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status Pembayaran</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={editing?.payment_status_id ? editing?.payment_status_id?.toString() : field.value as string} >
                                                    <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        {
                                                            paymentStatuses.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Items</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => append({ product_id: "", quantity: "", price: "", amount: "", productName: "" })}>
                                            <Plus className="size-3 mr-1" /> Add
                                        </Button>
                                    </div>

                                    {fields.length > 0 && fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-center p-2 border rounded bg-slate-50">
                                            <FormField
                                                control={form.control}
                                                name={`order_item.${index}.product_id`}
                                                render={({ field }) => {
                                                    return (<FormItem className="flex-1 space-y-1">

                                                        <Select onValueChange={field.onChange} defaultValue={editing?.order_item[index]?.product_id ? editing?.order_item[index]?.product_id?.toString() : field.value as string}>

                                                            <FormControl>
                                                                <SelectTrigger className="h-8 w-full">
                                                                    <SelectValue placeholder="Pilih Produk" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {products.map((p, key) => (
                                                                    <SelectItem key={key} value={p.id.toString()} >
                                                                        {p.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                    </FormItem>)
                                                }}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`order_item.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem className="w-16 space-y-1">
                                                        <FormControl>
                                                            <Input type="number" min="1" onChange={field.onChange} className="h-8 w-full" value={editing?.order_item[index]?.quantity ? editing?.order_item[index]?.quantity?.toString() : field.value as string | "1"} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => remove(index)}>
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    ))}
                                    <FormMessage>{form.formState.errors.order_item?.message}</FormMessage>
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="order_status_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status Pesanan</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={editing?.order_status_id ? editing?.order_status_id?.toString() : field.value as string}>
                                                    <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        {
                                                            orderStatuses.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DrawerFooter className="px-0 pt-4">
                                    <Button type="submit">
                                        Preview & Simpan
                                    </Button>
                                    <Button variant="ghost" type="button" onClick={() => setOpenEdit(false)}>Batal</Button>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}