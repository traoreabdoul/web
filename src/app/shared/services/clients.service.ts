import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

const baseUrl = 'http://localhost:3002/api/v1/clients';

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(baseUrl);
  }

  getClientById(id: any): Observable<Client> {
    return this.http.get<Client>(`${baseUrl}/${id}`);
  }

  createClient(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateProdivers(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteClients(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
