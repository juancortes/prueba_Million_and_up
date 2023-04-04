import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl:string = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient){}

  getData() {
    return this.http.get(this.baseUrl);
  }

  getDataById(id:string) {
    let url = this.baseUrl+"/"+id;
    return this.http.get(url, {responseType: 'json'});
  }
}
