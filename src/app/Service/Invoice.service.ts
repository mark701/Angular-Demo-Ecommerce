import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { invoiceH } from '../Models/InvoiceH.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl += 'Invoice'; // Example: https://your-api-base-url/products
  }

  SaveInvoice(InvoiceData: invoiceH): Observable<any> {
    return this.post('Save', InvoiceData);
  }

  getInvoicesH(): Observable<invoiceH[]> {
    return this.get<invoiceH[]>('Get'); // Get  invoice Header only
  }
  getInvoicesHD(): Observable<invoiceH[]> {
    return this.get<invoiceH[]>('GetHeaderDetail'); // Get  invoice Header and details
  }
  getInvoicesHDPages(pageNumber: number, pageSize: number): Observable<{ totalCount: number, data: invoiceH[] }> {
    return this.get<{ totalCount: number, data: invoiceH[] }>(
      `GetHeaderDetailsPages?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  
  getInvoice(id: string): Observable<invoiceH> {
    return this.http.get<invoiceH>(`${this.apiUrl}/GetDetailsByHeaderID/${id}`);
  }
  deleteProduct(id: string): Observable<any> {
    return this.delete(id);
  }
}