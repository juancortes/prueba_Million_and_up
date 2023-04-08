import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCardsComponent } from './shopping-cards/shopping-cards.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path:'', component: DashboardComponent},
          { path:'sales', component: VentasComponent},
          { path:'products/:id', component: ProductsComponent},
          { path:'shoping-cards', component: ShoppingCardsComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
