import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesafiosService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  saveDesafio(desafio: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const payload = {
      activity_key: desafio.key,
      activity: desafio.activity,
      type: desafio.type
    };

    return this.http.post(`${this.apiUrl}/desafios`, desafio, { headers });
  }

  getMeusDesafios(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<any[]>(`${this.apiUrl}/meus-desafios`, { headers });
  }

  iniciarDesafio(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.patch<any[]>(`${this.apiUrl}/meus-desafios/${id}/iniciar`, [], { headers });
  }

  atualizarProgresso(id: number, progresso: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.put<any[]>(`${this.apiUrl}/meus-desafios/${id}/progresso`, {progresso: progresso}, { headers });
  }

  excluirDesafio(id: number) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete<any[]>(`${this.apiUrl}/meus-desafios/${id}`, { headers });
  }
}
