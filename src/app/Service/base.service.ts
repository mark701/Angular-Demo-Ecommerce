// base.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
//   protected apiUrl = 'https://your-api-base-url';
  protected apiUrl = 'http://localhost:5179/api/';

  constructor(protected http: HttpClient) {

   }

  

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }


  
  // protected put<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  // }
  
  protected put<T>( data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}`, data);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  protected postForm<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, formData);
  }
  protected putForm<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, formData);
  }
}