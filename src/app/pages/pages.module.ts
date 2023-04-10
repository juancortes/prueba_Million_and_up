import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { SalesComponent } from './sales/sales.component';
import { MaterialModule } from '../material-module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { DialogCantidadComponent } from './dialogs/dialog-cantidad/dialog-cantidad.component';
import { ShoppingCardsComponent } from './shopping-cards/shopping-cards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    SalesComponent,
    ProductsComponent,
    DialogCantidadComponent,
    ShoppingCardsComponent,
    DialogConfirmComponent
  ], 
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    SalesComponent,
    ShoppingCardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PagesModule { }
