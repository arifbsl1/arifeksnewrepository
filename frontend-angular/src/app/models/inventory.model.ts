export interface Inventory {
    id: number;
    productId: string;
    productname: string;
    sku: string;
    quantity_available: number;
    quantity_reserved: number;
    reorder_level: number;
    location: string;
    batch_number: string;
    quantityInStock: number;
    category: string;
    brand: string;
    imageUrl: string;
    expiry_date: Date;
    last_stocked_date: Date;
    last_updated: Date;
    status: string;
    supplier_id: number;
    cost_price: number;
    selling_price: number;
    createdAt: Date;
    updatedAt: Date;
  }
  