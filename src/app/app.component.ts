import { Component, OnInit, Renderer2  } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  repositories: any[] = [];
  user: any = {};
  perPageCount: number = 0;
  currentPage: number = 1;
  perPageOptions: number[] = [10, 20, 50, 100];
  isLightMode: boolean = true;

  constructor(
    private apiService: ApiService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  getTotalPageArray(): number[] {
    const totalRepos = this.user.public_repos;
    const totalPages = Math.ceil(totalRepos / this.perPageCount);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if(!this.isLightMode) {this.renderer.addClass(document.body, 'dark-mode');}
    else {this.renderer.removeClass(document.body, 'dark-mode');}
  }

  onNext(): void {
    if (this.currentPage < this.user.public_repos) {
      this.currentPage++;
    }
    this.getUserRepos(this.user.login);
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getUserRepos(this.user.login);
  }

  onPage(page: number): void {
    this.currentPage = page;
    this.getUserRepos(this.user.login);
  }

  searchUser(username: string) {
    this.perPageCount = 10;
    this.getUserDetails(username);
    this.getUserRepos(username);
  }

  isUserNotEmpty(): boolean {
    return Object.keys(this.user).length !== 0;
  }

  getUserRepos(username: string) {
    this.apiService.getUserRepos(username, this.currentPage, this.perPageCount).subscribe(
      repos => {
        console.log(repos);
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
        this.user = user;
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    )
  }

  onChangePerPage() {
    this.currentPage = 1;
    this.getUserRepos(this.user.login);
  }
}
