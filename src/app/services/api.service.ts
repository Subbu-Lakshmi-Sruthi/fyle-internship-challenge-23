import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepos(username: string, page: number, perPage: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`).pipe(
      map(repos => repos.map(repo => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        topics: repo.topics
      })))
    );
  }
}
