import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Product } from '../Models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl += 'Product'; // Example: https://your-api-base-url/products
  }

  createProduct(productData: any): Observable<any> {
    return this.post('Save', productData);
  }

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('Get'); // Ensure API endpoint is correct
  }
  getProduct(id: string): Observable<any> {
    return this.get(id);
  }

  updateProduct( productData: any): Observable<any> {
    return this.put( productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.delete(id);
  }
}