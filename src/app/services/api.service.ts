import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://api.github.com';
  private cache = new Map<string, Observable<any[]>>();

  constructor(private http: HttpClient) { }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepos(username: string, page: number, perPage: number): Observable<any[]> {
    const cacheKey = `${username}_${page}_${perPage}`;
    
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const repos$ = this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`).pipe(
      map(repos => repos.map(repo => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        topics: repo.topics,
        public_repos: repo.public_repos
      }))),
      shareReplay(1)
    );

    this.cache.set(cacheKey, repos$);
    return repos$;
  }
}
