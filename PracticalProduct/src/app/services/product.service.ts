import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { ProductModel } from "../models/products/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

   constructor(private http: HttpClient) {}

   url = `${environment.url}products`;

   getProducts(): Observable<ProductModel[]> {
      return this.http.get<ProductModel[]>(`${this.url}`);
   }

   getProductById(id: number): Observable<ProductModel> {
      return this.http.get<ProductModel>(`${this.url}/${id}`);
   }

   deleteProductById(id: number): Observable<any> {
      return this.http.delete<any>(`${this.url}/${id}`);
   }

   getProductByfilter(codeBar: string): Observable<ProductModel> {
      return this.http.get<ProductModel>(`${this.url}/filter/${codeBar}`);
   }

   createProduct(body: any): Observable<any> {
      return this.http.post<any>(`${this.url}`, body);
   }

   updateProduct( productId: number, product: any ) {
      return this.http.put<any>(`${this.url}/${productId}`, product);
   }

}