import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../interfaces/provider';

const baseUrl = 'http://localhost:3000/api/v1/providers';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(baseUrl);
  }

  getProviderById(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${baseUrl}/${id}`);
  }

  createProvider(data: string): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateProdivers(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteProviders(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
