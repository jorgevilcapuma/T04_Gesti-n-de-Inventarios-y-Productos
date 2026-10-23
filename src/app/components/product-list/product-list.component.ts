import { Component, OnInit } from '@angular/core';
import { Product, CATEGORIES } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

type StockStatus = 'ok' | 'low' | 'out';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories = CATEGORIES;
  searchTerm = '';
  selectedCategory = '';
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.products.filter((p) =>
      (!term || p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)) &&
      (!this.selectedCategory || p.category === this.selectedCategory)
    );
  }

  get totalStock(): number {
    return this.products.reduce((sum, p) => sum + p.stock, 0);
  }

  get inventoryValue(): number {
    return this.products.reduce((sum, p) => sum + p.price * p.stock, 0);
  }

  get lowStockCount(): number {
    return this.products.filter((p) => this.stockStatus(p) !== 'ok').length;
  }

  stockStatus(product: Product): StockStatus {
    if (product.stock === 0) return 'out';
    if (product.stock < product.minStock) return 'low';
    return 'ok';
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  onCategory(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
  }

  deleteProduct(product: Product): void {
    if (product.id == null || !confirm(`¿Eliminar "${product.name}" del inventario?`)) return;
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.successMessage = `"${product.name}" fue eliminado.`;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err: Error) => (this.errorMessage = err.message)
    });
  }
}
