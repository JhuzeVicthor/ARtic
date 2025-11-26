import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://api.articc.com.br/api/auth';

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  fullName: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/register`, data);
  }

  login(data: AuthRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_BASE_URL}/login`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
