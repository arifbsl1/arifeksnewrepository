export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
  brand: string;
  sku: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
