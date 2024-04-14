import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-github-repo-list',
  templateUrl: './github-repo-list.component.html',
  styleUrls: ['./github-repo-list.component.scss']
})
export class GithubRepoListComponent implements OnInit{
  perPageCount: number = 10;
  currentPage: number = 1;
  perPageOptions: number[] = [10, 20, 50, 100];
  repos: any[] = [];

  @Input() user: any = {};

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.getRepos();
  }

  getTotalPageArray(): number[] {
    const totalPages = Math.ceil(this.user.public_repos / this.perPageCount);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onNext(): void {
    if (this.currentPage < this.user.public_repos) {
      this.currentPage++;
      this.getRepos();
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRepos();
    }
  }

  onPage(page: number): void {
    this.currentPage = page;
    this.getRepos();
  }

  onChangePerPage() {
    this.currentPage = 1;
    this.getRepos();
  }

  getRepos() {
    this.apiService.getUserRepos(this.user.login, this.currentPage, this.perPageCount).subscribe(
      repos => {
        this.repos = repos;
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    );
  }
}
