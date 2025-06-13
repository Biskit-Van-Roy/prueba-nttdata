import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProducto } from '../models/producto';


export interface Producto{
  name: string;
  description: string;
  logo: string;
  date_release:string;
  date_revision:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/bp/products'
  constructor(private http: HttpClient) { }

getProductos(): Observable<IProducto[]> {
  return this.http.get<{ data: IProducto[] }>(this.apiUrl).pipe(
    map(response => response.data)
  );
}
}
