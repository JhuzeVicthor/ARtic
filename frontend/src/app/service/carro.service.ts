import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../interface/carro.model';


@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private apiUrl = 'http://localhost:8080/api/carros';

  constructor(private http: HttpClient) { }

  getAllCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }

  getCarroById(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${id})`);
  }

  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }

  updateCarro(id: number, carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${id}`, carro);
  }

  deleteCarro(id: number):  Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
