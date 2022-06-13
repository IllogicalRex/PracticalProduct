import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { ProductModel } from "../models/products/product.model";
import { ProductDetailModel } from "../models/product-detail/detail.model";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailService {

    constructor(private http: HttpClient) {}

    url = `${environment.url}detail`;

    getDetailByProductId(productId: number): Observable<ProductDetailModel[]> {
        return this.http.get<ProductDetailModel[]>(`${this.url}/${productId}`);
    }

    deleteDetailById(id: number): Observable<ProductDetailModel[]> {
        return this.http.delete<ProductDetailModel[]>(`${this.url}/${id}`);
    }

    addDetails(detail: any): Observable<ProductDetailModel> {
        return this.http.post<ProductDetailModel>(`${this.url}/details`, detail);
    }

    addDetailById(detail: any): Observable<ProductDetailModel> {
        return this.http.post<ProductDetailModel>(`${this.url}`, detail);
    }

    updateDetail(id: number, detail: any): Observable<any> {
        return this.http.put<any>(`${this.url}/${id}`, detail);
    }

}