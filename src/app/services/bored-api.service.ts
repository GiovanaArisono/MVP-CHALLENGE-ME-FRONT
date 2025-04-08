import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoredAPIService {

  private baseUrl = 'http://127.0.0.1:8000/api/activity';

  constructor(private http: HttpClient) {}

  getRandomActivity(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/random`);
  }

  getFilteredActivities(type?: string, participants?: number): Observable<any> {
    let url = `${this.baseUrl}/filter?`;

    if (type) {
      url += `type=${type}&`;
    }
    if (participants) {
      url += `participants=${participants}`;
    }

    return this.http.get<any>(url);
  }

  getActivityByKey(key: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/activity/${key}`);
  }
}
