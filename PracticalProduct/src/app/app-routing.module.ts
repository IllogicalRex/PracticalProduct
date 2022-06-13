import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'product', component: ProductsComponent,
  },
  {
    path: 'detail/:id', component: ProductDetailComponent,
  },
  { 
    path: '**', redirectTo: 'product', data: { title: 'Productos' }, pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
