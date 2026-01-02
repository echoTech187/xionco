'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('products', [
      {
        name: 'Logitech G304 Lightspeed Wireless Gaming Mouse',
        sku: 'LOG-G304-BLK',
        category: 'Elektronik',
        description: 'Mouse gaming wireless dengan sensor HERO yang presisi dan daya tahan baterai ultra-panjang.',
        image: 'https://placehold.co/600x400?text=Logitech+G304',
        price: '459000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S23 Ultra 5G',
        sku: 'SAM-S23U-256',
        category: 'Handphone & Aksesoris',
        description: 'Smartphone flagship dengan kamera 200MP dan performa Snapdragon 8 Gen 2 for Galaxy.',
        image: 'https://placehold.co/600x400?text=Samsung+S23+Ultra',
        price: '19999000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Philips Air Fryer HD9200',
        sku: 'PHI-AF-HD9200',
        category: 'Elektronik Rumah Tangga',
        description: 'Penggorengan tanpa minyak dengan teknologi Rapid Air untuk makanan yang lebih sehat.',
        image: 'https://placehold.co/600x400?text=Philips+Air+Fryer',
        price: '1200000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kemeja Flanel Pria Kotak-Kotak',
        sku: 'FAS-MEN-FL-001',
        category: 'Fashion Pria',
        description: 'Kemeja flanel bahan katun adem, cocok untuk gaya kasual sehari-hari.',
        image: 'https://placehold.co/600x400?text=Kemeja+Flanel',
        price: '125000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wardah Exclusive Matte Lip Cream',
        sku: 'BEA-WAR-LIP-01',
        category: 'Kecantikan',
        description: 'Lip cream dengan hasil matte yang tahan lama dan tidak membuat bibir kering.',
        image: 'https://placehold.co/600x400?text=Wardah+Lip+Cream',
        price: '62000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sepatu Sneakers Pria Casual Putih',
        sku: 'SHO-MEN-SNK-WHT',
        category: 'Sepatu Pria',
        description: 'Sneakers putih desain minimalis, nyaman dipakai jalan jauh.',
        image: 'https://placehold.co/600x400?text=Sneakers+Putih',
        price: '250000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tas Ransel Laptop Anti Air',
        sku: 'BAG-LAP-WP-001',
        category: 'Tas Pria',
        description: 'Tas ransel muat laptop 15.6 inch, bahan waterproof aman saat hujan.',
        image: 'https://placehold.co/600x400?text=Tas+Laptop',
        price: '185000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
        sku: 'SON-WH1000XM5',
        category: 'Audio',
        description: 'Headphone dengan noise cancelling terbaik di kelasnya dan audio resolusi tinggi.',
        image: 'https://placehold.co/600x400?text=Sony+WH-1000XM5',
        price: '5499000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SKINTIFIC 5X Ceramide Barrier Repair Moisture Gel',
        sku: 'BEA-SKI-MOIST',
        category: 'Kecantikan',
        description: 'Pelembab wajah dengan 5 tipe Ceramide untuk memperbaiki skin barrier.',
        image: 'https://placehold.co/600x400?text=Skintific+Moisture',
        price: '135000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Miyako Magic Com Rice Cooker 1.8L',
        sku: 'HAP-MIY-RC-18',
        category: 'Elektronik Rumah Tangga',
        description: 'Rice cooker 3-in-1 (memasak, mengukus, menghangatkan) dengan kapasitas 1.8 liter.',
        image: 'https://placehold.co/600x400?text=Miyako+Rice+Cooker',
        price: '280000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Celana Chino Pria Slim Fit',
        sku: 'FAS-MEN-CH-01',
        category: 'Fashion Pria',
        description: 'Celana chino bahan stretch yang nyaman, potongan slim fit modern.',
        image: 'https://placehold.co/600x400?text=Celana+Chino',
        price: '150000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gamis Wanita Modern Syari',
        sku: 'FAS-WOM-GMS-01',
        category: 'Fashion Muslim',
        description: 'Gamis bahan wollycrepe premium, busui friendly, desain elegan.',
        image: 'https://placehold.co/600x400?text=Gamis+Syari',
        price: '180000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple iPhone 14 128GB',
        sku: 'APP-IPH14-128',
        category: 'Handphone & Aksesoris',
        description: 'iPhone 14 dengan sistem kamera ganda canggih dan chip A15 Bionic.',
        image: 'https://placehold.co/600x400?text=iPhone+14',
        price: '13999000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Indomie Goreng 1 Dus (40 Pcs)',
        sku: 'GRO-IND-GOR-BOX',
        category: 'Makanan & Minuman',
        description: 'Mie instan goreng paling populer, 1 dus isi 40 bungkus.',
        image: 'https://placehold.co/600x400?text=Indomie+Goreng',
        price: '115000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sunscreen Azarine Hydrasoothe Gel',
        sku: 'BEA-AZA-SUN',
        category: 'Kecantikan',
        description: 'Tabir surya tekstur gel yang ringan, dingin, dan mudah meresap.',
        image: 'https://placehold.co/600x400?text=Azarine+Sunscreen',
        price: '55000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Keyboard Mechanical Keychron K2',
        sku: 'COM-KEY-K2',
        category: 'Komputer & Aksesoris',
        description: 'Keyboard mekanik wireless 75% layout, kompatibel Mac dan Windows.',
        image: 'https://placehold.co/600x400?text=Keychron+K2',
        price: '1450000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Helm Bogo Retro SNI',
        sku: 'AUT-HLM-BOGO',
        category: 'Otomotif',
        description: 'Helm retro desain klasik, sudah SNI, busa bisa dilepas cuci.',
        image: 'https://placehold.co/600x400?text=Helm+Bogo',
        price: '180000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sprei Kintakun King Size 180x200',
        sku: 'HOM-SPR-KING',
        category: 'Perlengkapan Rumah',
        description: 'Sprei bahan microtex disperse, halus, lembut, dan tidak luntur.',
        image: 'https://placehold.co/600x400?text=Sprei+King',
        price: '95000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botol Minum Tumbler Stainless Steel 500ml',
        sku: 'HOM-TUM-500',
        category: 'Perlengkapan Rumah',
        description: 'Tumbler tahan panas dan dingin hingga 12 jam, bahan stainless steel food grade.',
        image: 'https://placehold.co/600x400?text=Tumbler',
        price: '75000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jam Tangan Casio G-Shock DW-5600',
        sku: 'WAT-CAS-GSHOCK',
        category: 'Jam Tangan',
        description: 'Jam tangan digital tahan guncangan dan air hingga 200 meter.',
        image: 'https://placehold.co/600x400?text=G-Shock',
        price: '1100000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Powerbank Anker PowerCore 10000mAh',
        sku: 'ACC-ANK-10000',
        category: 'Handphone & Aksesoris',
        description: 'Powerbank ukuran compact dengan kapasitas real 10000mAh dan fast charging.',
        image: 'https://placehold.co/600x400?text=Powerbank+Anker',
        price: '350000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kaos Polos Cotton Combed 30s',
        sku: 'FAS-TSHIRT-30S',
        category: 'Fashion Pria',
        description: 'Kaos polos bahan 100% cotton combed 30s, adem dan menyerap keringat.',
        image: 'https://placehold.co/600x400?text=Kaos+Polos',
        price: '45000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Scarlett Whitening Body Lotion',
        sku: 'BEA-SCA-LOT',
        category: 'Kecantikan',
        description: 'Body lotion dengan kandungan Glutathione dan Vitamin E untuk mencerahkan kulit.',
        image: 'https://placehold.co/600x400?text=Scarlett+Lotion',
        price: '75000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stand Laptop Aluminium Portable',
        sku: 'ACC-LAP-STD',
        category: 'Komputer & Aksesoris',
        description: 'Stand laptop ergonomis bahan aluminium, bisa dilipat dan diatur ketinggiannya.',
        image: 'https://placehold.co/600x400?text=Stand+Laptop',
        price: '85000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pampers Sweety Gold Pants L30',
        sku: 'MOM-SWE-L30',
        category: 'Ibu & Bayi',
        description: 'Popok celana bayi size L isi 30, dengan teknologi Diamond Layer agar tetap kering.',
        image: 'https://placehold.co/600x400?text=Sweety+Gold',
        price: '89000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kipas Angin Berdiri Miyako',
        sku: 'HAP-MIY-FAN',
        category: 'Elektronik Rumah Tangga',
        description: 'Kipas angin stand fan 16 inch dengan 3 pilihan kecepatan angin kencang.',
        image: 'https://placehold.co/600x400?text=Kipas+Miyako',
        price: '275000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rak Sepatu 4 Susun Portable',
        sku: 'HOM-RAK-SPT',
        category: 'Perlengkapan Rumah',
        description: 'Rak sepatu minimalis 4 susun, bahan besi dan konektor plastik kokoh.',
        image: 'https://placehold.co/600x400?text=Rak+Sepatu',
        price: '45000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Masker Duckbill Sensipads 50 Pcs',
        sku: 'HEA-MSK-DCK',
        category: 'Kesehatan',
        description: 'Masker medis model duckbill 3 ply, nyaman untuk bernapas, isi 50 pcs.',
        image: 'https://placehold.co/600x400?text=Masker+Duckbill',
        price: '30000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jilbab Bella Square Polycotton',
        sku: 'FAS-WOM-HJB',
        category: 'Fashion Muslim',
        description: 'Hijab segi empat bahan polycotton premium, mudah dibentuk dan tegak di dahi.',
        image: 'https://placehold.co/600x400?text=Bella+Square',
        price: '15000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'TWS Lenovo GM2 Pro',
        sku: 'AUD-LEN-GM2',
        category: 'Audio',
        description: 'Earphone bluetooth gaming low latency dengan desain futuristik.',
        image: 'https://placehold.co/600x400?text=TWS+Lenovo',
        price: '150000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dompet Pria Kulit Asli',
        sku: 'FAS-MEN-WAL',
        category: 'Tas Pria',
        description: 'Dompet lipat pria bahan kulit sapi asli, awet dan elegan.',
        image: 'https://placehold.co/600x400?text=Dompet+Kulit',
        price: '120000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Blender Philips HR2115',
        sku: 'HAP-PHI-BLD',
        category: 'Elektronik Rumah Tangga',
        description: 'Blender kapasitas 2 liter dengan tabung plastik anti pecah dan pisau tajam.',
        image: 'https://placehold.co/600x400?text=Blender+Philips',
        price: '650000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lampu LED Philips 10 Watt',
        sku: 'HOM-LMP-10W',
        category: 'Perlengkapan Rumah',
        description: 'Lampu LED hemat energi, cahaya putih terang dan tahan lama.',
        image: 'https://placehold.co/600x400?text=Lampu+Philips',
        price: '35000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sandal Jepit Swallow',
        sku: 'FAS-SND-SWL',
        category: 'Sepatu Pria',
        description: 'Sandal jepit legendaris Indonesia, karet kuat dan anti slip.',
        image: 'https://placehold.co/600x400?text=Sandal+Swallow',
        price: '12000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kopi Kapal Api Special Mix (10 Sachet)',
        sku: 'GRO-KOP-KAP',
        category: 'Makanan & Minuman',
        description: 'Kopi hitam bubuk instan dengan gula, aroma mantap.',
        image: 'https://placehold.co/600x400?text=Kopi+Kapal+Api',
        price: '14000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Microwave Sharp R-728',
        sku: 'HAP-SHA-MIC',
        category: 'Elektronik Rumah Tangga',
        description: 'Microwave oven dengan fitur grill dan menu masak otomatis.',
        image: 'https://placehold.co/600x400?text=Microwave+Sharp',
        price: '1300000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Redmi Note 12',
        sku: 'XIA-RED-N12',
        category: 'Handphone & Aksesoris',
        description: 'Smartphone layar AMOLED 120Hz dan chipset Snapdragon 685.',
        image: 'https://placehold.co/600x400?text=Redmi+Note+12',
        price: '2499000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maybelline Lash Lift Mascara',
        sku: 'BEA-MAY-MAS',
        category: 'Kecantikan',
        description: 'Maskara waterproof untuk efek bulu mata lentik dan panjang seketika.',
        image: 'https://placehold.co/600x400?text=Maybelline+Mascara',
        price: '89000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Setrika Gosokan Philips Dry Iron',
        sku: 'HAP-PHI-IRN',
        category: 'Elektronik Rumah Tangga',
        description: 'Setrika listrik dengan tapak anti lengket dan ujung runcing memudahkan menyetrika.',
        image: 'https://placehold.co/600x400?text=Setrika+Philips',
        price: '160000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Topi Baseball Distro',
        sku: 'FAS-ACC-HAT',
        category: 'Fashion Pria',
        description: 'Topi baseball bahan rafel denim, strap belakang besi, gaya kekinian.',
        image: 'https://placehold.co/600x400?text=Topi+Baseball',
        price: '35000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minyak Goreng Tropical 2 Liter',
        sku: 'GRO-OIL-TRO',
        category: 'Makanan & Minuman',
        description: 'Minyak goreng kelapa sawit berkualitas, 2 kali penyaringan.',
        image: 'https://placehold.co/600x400?text=Minyak+Tropical',
        price: '38000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Printer Epson L3210',
        sku: 'COM-PRI-EPS',
        category: 'Komputer & Aksesoris',
        description: 'Printer EcoTank All-in-One (Print, Scan, Copy) yang hemat tinta.',
        image: 'https://placehold.co/600x400?text=Printer+Epson',
        price: '2300000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart TV Samsung 43 Inch 4K',
        sku: 'ELE-TV-SAM43',
        category: 'Elektronik',
        description: 'Smart TV resolusi 4K UHD dengan warna kristal dan desain tipis.',
        image: 'https://placehold.co/600x400?text=Smart+TV+Samsung',
        price: '4500000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mainan LEGO Classic Medium',
        sku: 'TOY-LEG-CLS',
        category: 'Mainan & Hobi',
        description: 'Box balok LEGO klasik untuk melatih kreativitas anak.',
        image: 'https://placehold.co/600x400?text=LEGO+Classic',
        price: '450000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kursi Gaming Fantech',
        sku: 'GAM-CHA-FAN',
        category: 'Gaming',
        description: 'Kursi gaming ergonomis dengan sandaran bisa direbahkan 180 derajat.',
        image: 'https://placehold.co/600x400?text=Kursi+Gaming',
        price: '1800000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sabun Mandi Lifebuoy Cair Refill',
        sku: 'BEA-LIF-WSH',
        category: 'Perawatan Tubuh',
        description: 'Sabun cair antibakteri kemasan isi ulang 450ml.',
        image: 'https://placehold.co/600x400?text=Sabun+Lifebuoy',
        price: '22000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Harddisk Eksternal WD Elements 1TB',
        sku: 'COM-HDD-WD1',
        category: 'Komputer & Aksesoris',
        description: 'Penyimpanan portabel 1TB USB 3.0, transfer data cepat.',
        image: 'https://placehold.co/600x400?text=WD+Elements',
        price: '780000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jaket Hoodie Polos Unisex',
        sku: 'FAS-HOD-UNI',
        category: 'Fashion Pria',
        description: 'Jaket hoodie jumper bahan fleece tebal, hangat dan nyaman.',
        image: 'https://placehold.co/600x400?text=Jaket+Hoodie',
        price: '85000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kacamata Anti Radiasi',
        sku: 'FAS-ACC-GLS',
        category: 'Aksesoris Fashion',
        description: 'Kacamata lensa blueray untuk melindungi mata dari layar gadget.',
        image: 'https://placehold.co/600x400?text=Kacamata',
        price: '45000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mesin Cuci Sharp 2 Tabung',
        sku: 'HAP-SHA-WSH',
        category: 'Elektronik Rumah Tangga',
        description: 'Mesin cuci 2 tabung kapasitas 8kg, hemat listrik dan air.',
        image: 'https://placehold.co/600x400?text=Mesin+Cuci',
        price: '1800000',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('products', null, {});
    
  }
};
