"use client"

import { startTransition, useActionState, useEffect } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Plus, Edit3, Trash2, Layers } from "lucide-react"
import { useProduct } from "@/hooks/use-product"
import { useStock } from "@/hooks/use-stock"
import { useTable } from "@/hooks/use-table"
import { deleteProductAction, saveProductAction, saveStockAction } from "@/app/_action/productAction"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"


export default function ProductPage() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(saveProductAction, null)
    const [stateStock, formActionStock, isPendingStock] = useActionState(saveStockAction, null)
    const {
        form,
        products,
        editing,
        setEditing,
        openEdit,
        setOpenEdit,
        openCreate
    } = useProduct();
    const {
        stockForm,
        stocks,
        openStockEditor,
        setOpenStockEditor,
        stockProduct,
        changeStockEditor
    } = useStock()
    const {
        query,
        setQuery,
        filterInStock,
        setFilterInStock,
        page,
        setPage,
        pageCount,
        pageItems,
        filtered
    } = useTable({
        products,
        stocks
    });
    useEffect(() => {
        function initState() {
            if (state?.error || stateStock?.error) {
                toast.error(state?.message || stateStock?.message, { description: state?.error || stateStock?.error })
            } else if (state?.success || stateStock?.success) {
                toast.success(state?.message || stateStock?.message, { description: state?.description || stateStock?.description })
                setOpenEdit(false)
                setOpenStockEditor(false)
                window.location.reload()
            }
        }

        initState()

    }, [state, stateStock, setOpenEdit, setOpenStockEditor, router])

    async function handleDelete(id: string) {
        if (!confirm("Hapus produk ini?")) return
        const result = await deleteProductAction(null, id)
        if (result.success) {
            toast.success(result.message, { description: result.description })
            window.location.reload()
        } else {
            toast.error(result.message)
        }
    }

    function onStockSubmit() {

        const formData = new FormData();
        formData.append("payload", JSON.stringify({
            product_id: stockProduct?.id,
            current_stock: stockForm.getValues().current_stock
        }));

        startTransition(() => {
            formActionStock(formData);
        })

    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Products</h1>
                <div className="flex items-center gap-2">
                    <Input placeholder="Search by name or code" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} />
                    <Select onValueChange={(v) => { setFilterInStock(v); setPage(1) }}>
                        <SelectTrigger size="sm">
                            <SelectValue>{filterInStock === "all" ? "All" : filterInStock === "instock" ? "In Stock" : "Out of Stock"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="instock">In Stock</SelectItem>
                            <SelectItem value="out">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={openCreate}>
                        <Plus className="size-4" />
                        <span className="hidden sm:inline">New</span>
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageItems.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>
                                        <div className="font-medium text-wrap">{p.name}</div>
                                        <div className="text-xs text-muted-foreground">{p.category}</div>
                                    </TableCell>
                                    <TableCell>{p.sku}</TableCell>
                                    <TableCell>Rp. {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                                    <TableCell>{p.current_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ?? 0}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => {
                                                setEditing(p);
                                                form.reset({
                                                    id: p.id,
                                                    sku: p.sku,
                                                    name: p.name,
                                                    price: p.price,
                                                    description: p.description || "",
                                                    category: p.category || "",
                                                    image: p.image || ""
                                                });
                                                setOpenEdit(true)
                                            }}>
                                                <Edit3 className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => changeStockEditor(p)}>
                                                <Layers className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
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

            {/* Edit/Create Drawer */}
            <Drawer open={openEdit} onOpenChange={setOpenEdit} direction="right" >
                <DrawerContent className="min-w-2xl">
                    <DrawerHeader>
                        <DrawerTitle>{editing?.name ? `${editing.name}` : "Create Product"}</DrawerTitle>
                        <DrawerDescription>Manage product information and variants.</DrawerDescription>
                    </DrawerHeader>

                    {editing && (
                        <div className="p-4 overflow-y-auto">
                            <Form {...form}>
                                <form action={formAction} className="space-y-4">
                                    {
                                        editing?.id &&
                                        <FormField
                                            control={form.control}
                                            name="id"
                                            render={({ field }) => {
                                                return <Input type="hidden" {...field} />
                                            }} />
                                    }


                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => {

                                            return <FormItem>
                                                <FormLabel>SKU</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>Nama Barang</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>Deskripsi</FormLabel>
                                                <FormControl>
                                                    <Textarea className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>Harga</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        }} />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>Kategori</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />



                                    <DrawerFooter className="px-0">
                                        <Button disabled={isPending} type="submit">{
                                            isPending ? "Menyimpan..." :
                                                editing.id ? "Simpan" : "Tambahkan"
                                        }</Button>
                                        <Button variant="ghost" onClick={() => setOpenEdit(false)}>Batal</Button>
                                    </DrawerFooter>
                                </form>
                            </Form>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>

            {/* Stock Editor Drawer */}
            <Drawer open={openStockEditor} onOpenChange={setOpenStockEditor} direction="right">
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Manage Stock</DrawerTitle>
                        <DrawerDescription>Edit stock quantity for the product.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 mb-6">
                        {stockProduct && (
                            <Form {...stockForm}>
                                <form onSubmit={stockForm.handleSubmit(onStockSubmit)}>
                                    <FormField
                                        control={stockForm.control}
                                        name="product_id"
                                        render={({ }) => {
                                            return <FormItem>
                                                <FormControl>
                                                    <Input type="hidden" defaultValue={stockProduct.id} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }}
                                    />
                                    <FormField
                                        control={stockForm.control}
                                        name="current_stock"
                                        render={({ field }) => {
                                            return <FormItem className="mb-6">
                                                <FormControl>
                                                    <Input type="number" onChange={(e) => stockForm.setValue("current_stock", e.target.value)} defaultValue={stockProduct ? stockProduct.current_stock : field.value} className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }}
                                    />

                                    <div className="flex gap-2">
                                        <div className="ml-auto flex gap-2">
                                            <Button type="submit" disabled={isPendingStock}>
                                                {
                                                    isPendingStock ? "Menyimpan..." : "Simpan"
                                                }
                                            </Button>
                                            <Button variant="ghost" onClick={() => setOpenStockEditor(false)}>Batal</Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}