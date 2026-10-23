import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIES, Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: false,
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  categories = CATEGORIES;
  productId: number | null = null;
  saving = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private existingProducts: Product[] = [];

  form = this.fb.nonNullable.group({
    sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/), (c: AbstractControl) => this.skuTakenValidator(c)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.1)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    minStock: [5, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    supplier: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get isEdit(): boolean {
    return this.productId !== null;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => (this.existingProducts = products)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = Number(id);
      this.productService.getById(this.productId).subscribe({
        next: (product) => this.form.patchValue(product),
        error: (err: Error) => (this.errorMessage = err.message)
      });
    }
  }

  isInvalid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  /** Normaliza el SKU a mayúsculas mientras el usuario escribe. */
  onSkuInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.form.controls.sku.setValue(value, { emitEvent: true });
  }

  private skuTakenValidator(control: AbstractControl): ValidationErrors | null {
    const sku = String(control.value ?? '').trim().toUpperCase();
    if (!sku) return null;
    const taken = this.existingProducts.some((p) => p.sku.toUpperCase() === sku && p.id !== this.productId);
    return taken ? { skuTaken: true } : null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.errorMessage = '';
    const raw = this.form.getRawValue();
    const product: Product = {
      ...raw,
      sku: raw.sku.trim().toUpperCase(),
      name: raw.name.trim(),
      supplier: raw.supplier.trim()
    };

    const request$ = this.isEdit
      ? this.productService.update(this.productId!, product)
      : this.productService.create(product);

    request$.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.saving = false;
      }
    });
  }
}
