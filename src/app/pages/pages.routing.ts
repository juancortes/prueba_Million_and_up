import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCardsComponent } from './shopping-cards/shopping-cards.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path:'', component: DashboardComponent},
          { path:'sales', component: SalesComponent},
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
