import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  repositories: any[] = [];
  user: any = {};
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
   
  }

  searchUser(username: string) {
    this.getUserRepos(username);
    this.getUserDetails(username);
  }

  getUserRepos(username: string) {
    this.apiService.getUserRepos(username).subscribe(
      repos => {
        this.repositories = repos;
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    );
  }

  getUserDetails(username: string) {
    this.apiService.getUserDetails(username).subscribe(
      user => {
        console.log(user);
        this.user = user;
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    )
  }
}
