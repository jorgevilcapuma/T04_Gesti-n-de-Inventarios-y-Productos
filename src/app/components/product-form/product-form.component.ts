import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.nonNullable.group({
    sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)]],
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.errorMessage = '';
    const product: Product = this.form.getRawValue();

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
