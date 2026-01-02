/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Order } from "./types/order";

export const exportToExcel = (orders: Order[]) => {
    // 1. Format Data
    const data = orders.map(order => ({
        "Order ID": order.id,
        "Customer": order.customer_name,
        "Date": order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-",
        "Status": order.order_status,
        "Payment": order.payment_status,
        "Method": order.payment_method,
        "Items Count": order.order_item.length,
        "Total Amount": order.total_price
    }));

    // 2. Hitung Totals
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + (parseInt(o.total_price) || 0), 0);

    // 3. Tambahkan Baris Kosong dan Baris Total di Paling Bawah
    data.push({} as any); // Spacer
    data.push({
        "Order ID": "TOTAL SUMMARY",
        "Customer": "",
        "Date": "",
        "Status": "",
        "Payment": "",
        "Method": "",
        "Items Count": totalOrders, // Total Pesanan
        "Total Amount": totalSales  // Total Penjualan
    } as any);

    // 4. Create Workbook & Sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // 5. Save File
    XLSX.writeFile(workbook, `Orders_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const parseExcelImport = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Hapus baris terakhir jika itu adalah baris Total (cek kolom pertama)
            const cleanedData = jsonData.filter((row: any) => {
                const firstKey = Object.keys(row)[0];
                const value = String(row[firstKey]).toUpperCase();
                return !value.includes("TOTAL SUMMARY") && !value.includes("TOTAL PESANAN");
            });

            resolve(cleanedData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

export const generateInvoicePDF = (order: Order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("INVOICE", 14, 22);

    doc.setFontSize(10);
    doc.text(`Invoice #: ${order.id}`, 14, 30);
    doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`, 14, 35);
    doc.text(`Customer: ${order.customer_name}`, 14, 40);
    doc.text(`Status: ${order.payment_status.toUpperCase()}`, 14, 45);

    // Table Items
    const tableColumn = ["Product", "Qty", "Price", "Total"];
    const tableRows = order.order_item.map(item => [
        item.productName || item.product_id,
        item.quantity,
        `Rp ${parseInt(item.price ?? 0).toLocaleString('id-ID') || '-'}`,
        `Rp ${((parseInt(item.price ?? 0)) * parseInt(item.quantity)).toLocaleString('id-ID')}`
    ]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 55,
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Grand Total: Rp ${parseInt(order.total_price).toLocaleString('id-ID')}`, 14, finalY);

    // Footer
    doc.setFontSize(8);
    doc.text("Thank you for your business.", 14, finalY + 10);

    // Save
    doc.save(`Invoice_${order.id}.pdf`);
};