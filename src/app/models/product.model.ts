export interface Product {
  id?: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
  createdAt?: string;
}

export const CATEGORIES: string[] = [
  'Abarrotes',
  'Bebidas',
  'Limpieza',
  'Cuidado Personal',
  'Lácteos',
  'Snacks'
];
