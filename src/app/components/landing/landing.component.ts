import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: false,
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  services: Service[] = [
    {
      icon: '📦',
      title: 'Registro de productos',
      description: 'Registra productos con SKU, categoría, precio, stock y proveedor mediante formularios validados en tiempo real.'
    },
    {
      icon: '📊',
      title: 'Control de stock',
      description: 'Visualiza el inventario en una tabla con alertas automáticas de stock bajo y productos agotados.'
    },
    {
      icon: '🔍',
      title: 'Búsqueda y filtros',
      description: 'Encuentra cualquier producto al instante filtrando por nombre, SKU o categoría.'
    }
  ];

  team: TeamMember[] = [
    { initials: 'JV', name: 'Jorge Vilcapuma Trujillo', role: 'Líder de Maquetación · API REST' },
    { initials: 'DL', name: 'Daniel Yerson Leyva Cespedes', role: 'Frontend Developer · Formularios y QA' }
  ];

  contactSent = false;

  private fb = inject(FormBuilder);

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isInvalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  sendContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.contactSent = true;
    this.contactForm.reset();
  }
}
