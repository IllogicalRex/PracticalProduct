import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryModel } from "../models/category/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

   constructor(private http: HttpClient) {}

   url = `${environment.url}category`;

   getCategories(): Observable<CategoryModel[]> {
      return this.http.get<CategoryModel[]>(`${this.url}`);
   }

   getCategoryById(id: number): Observable<CategoryModel> {
      return this.http.get<CategoryModel>(`${this.url}/${id}`);
   }

}