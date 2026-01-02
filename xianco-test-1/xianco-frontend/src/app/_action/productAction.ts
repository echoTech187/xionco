import { productUseCase } from "@/di/modules";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveProductAction(prevState: any, formdata: FormData) {
    const id = formdata.get("id") as string;
    const name = formdata.get("name") as string;
    const sku = formdata.get("sku") as string;
    const price = formdata.get("price") as string;
    const category = formdata.get("category") as string;
    const image = formdata.get("image") as string;
    const description = formdata.get("description") as string;
    const data = {
        id,
        name,
        sku,
        price,
        category,
        image,
        description,
    };
    const saveProduct = await productUseCase.saveProduct(data)
    if (saveProduct.success) {
        return {
            success: true,
            message: saveProduct.message,
            description: saveProduct.description
        }
    } else {
        return {
            success: false,
            message: saveProduct.message,
            error: saveProduct.error
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteProductAction(prevState: any, id: string) {
    if (!id) {
        return {
            success: false,
            message: "Produk tidak ditemukan",
            error: "NOT_FOUND"
        }
    }
    const deleteProduct = await productUseCase.deleteProduct(id)
    if (deleteProduct.success) {
        return {
            success: true,
            message: deleteProduct.message,
            description: deleteProduct.description
        }
    } else {
        return {
            success: false,
            message: deleteProduct.message,
            error: deleteProduct.error
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveStockAction(prevState: any, formdata: FormData) {
    console.log(formdata.get("payload"));

    const rawData = JSON.parse(formdata.get("payload") as string);
    const product_id = rawData.product_id as string;
    const current_stock = rawData.current_stock as string;
    const data = { product_id, current_stock };
    const saveStock = await productUseCase.saveStock(data)
    if (saveStock.success) {
        return {
            success: true,
            message: saveStock.message,
            description: saveStock.description
        }
    } else {
        return {
            success: false,
            message: saveStock.message,
            error: saveStock.error
        }
    };
}