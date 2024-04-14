import { Component, OnInit  } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  user: any = {};

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {}

  searchUser(username: string) {
    this.getUserDetails(username);
  }

  isUserNotEmpty(): boolean {
    return Object.keys(this.user).length !== 0;
  }

  getUserDetails(username: string) {
    this.apiService.getUserDetails(username).subscribe(
      user => {
        this.user = user;
      },
      error => {
        alert("User doesn't exist! Try another username.");
      }
    )
  }

}
