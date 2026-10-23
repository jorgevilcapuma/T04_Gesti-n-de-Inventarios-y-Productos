import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: LandingComponent, title: 'ProdManager Pro | Inicio' },
  { path: 'productos', component: ProductListComponent, title: 'ProdManager Pro | Inventario' },
  { path: 'productos/nuevo', component: ProductFormComponent, title: 'ProdManager Pro | Nuevo producto' },
  { path: 'productos/editar/:id', component: ProductFormComponent, title: 'ProdManager Pro | Editar producto' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
