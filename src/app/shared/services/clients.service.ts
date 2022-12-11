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

  /**
   * Get all client in database
   * @returns All clients in database
   */
  getAllClients(): Observable<any> {
    return this.http.get<Client[]>(baseUrl);
  }

  /**
   * This function get client by client Id
   * @param id of client
   * @returns one client
   */
  getClientById(id: any): Observable<Client> {
    return this.http.get<Client>(`${baseUrl}/${id}`);
  }

  /**
   * This function create a client
   * @param data client informations
   * @returns new client informations
   */
  createClient(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  /**
   * This function update a client
   * @param id of client
   * @param data client update informations
   * @returns updated client
   */
  updateProdivers(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  /**
   * This function delete a client
   * @param id of client
   * @returns 
   */
  deleteClients(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
