import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../interface/carro.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private apiUrl = 'https://54.232.167.186:8080/api/carros';

  constructor(private http: HttpClient) { }

  getAllCarros(disponivelParaAluguel?: boolean, disponivelParaVenda?: boolean): Observable<Carro[]> {
    let params = new HttpParams();
    if (disponivelParaAluguel !== undefined && disponivelParaAluguel !== null) {
      params = params.set('disponivelParaAluguel', disponivelParaAluguel.toString());
    }
    if (disponivelParaVenda !== undefined && disponivelParaVenda !== null) {
      params = params.set('disponivelParaVenda', disponivelParaVenda.toString());
    }
    return this.http.get<Carro[]>(this.apiUrl, { params });
  }

  getCarroById(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${id}`);
  }

  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }

  getCarrosAluguel(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}?disponivelParaAluguel=true`);
  }

  updateCarro(id: number, carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${id}`, carro);
  }

  deleteCarro(id: number):  Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
