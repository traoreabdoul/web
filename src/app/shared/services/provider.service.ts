import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../interfaces/provider';

const baseUrl = 'http://localhost:3002/api/v1/providers';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  /**
   * Get all providers in database
   * @returns All providers in database
   */
  getAllProviders(): Observable<any> {
    return this.http.get<Provider[]>(baseUrl);
  }

   /**
   * This function get provider by provider Id
   * @param id of provider
   * @returns one provider
   */
  getProviderById(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${baseUrl}/${id}`);
  }

  /**
   * This function create a provider
   * @param data provider informations
   * @returns new provider informations
   */
  createProvider(data: string): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  /**
   *  This function update a provider
   * @param id of provider
   * @param data provider update informations
   * @returns updated provider
   */
  updateProdivers(id: string, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

    /**
   * this function delete a provider
   * @param id of provider
   * @param data provider update informations
   * @returns updated provider
   */
  deleteProviders(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
