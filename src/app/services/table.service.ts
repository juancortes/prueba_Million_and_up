import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { ShoppingCard } from '../model/shopping-card';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseURL:string = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient){}

  getDataProducts() {
    return this.http.get(this.baseURL+'products');
  }

  getDataProductById(id:string) {
    let url = this.baseURL+"products"+"/"+id;
    return this.http.get(url, {responseType: 'json'});
  }

  saveProduct(product:Product):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    console.log(body)
    return this.http.post(this.baseURL + 'products', body,{'headers':headers})
  }

  getDataShoppingCards() {
    return this.http.get(this.baseURL+'shopping_carts');
  }

  getDataShoppingCardById(id:string) {
    let url = this.baseURL+"shopping_carts"+"/"+id;
    return this.http.get(url, {responseType: 'json'});
  }

  getDataShoppingCardByProducts_id(products_id:string) {
    let url = this.baseURL+"shopping_carts"+"/getProductsId/"+products_id;
    return this.http.get(url, {responseType: 'json'});
  }

  saveShoppingCard(shopingCard:ShoppingCard):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shopingCard);
    console.log(body)
    return this.http.post(this.baseURL + 'shopping_carts', body,{'headers':headers})
  }

  deleteShoppingCard(id:string):Observable<any>{
    return this.http.delete(this.baseURL + 'shopping_carts/' + id)
  }
}
