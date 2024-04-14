import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-github-repo-list',
  templateUrl: './github-repo-list.component.html',
  styleUrls: ['./github-repo-list.component.scss']
})
export class GithubRepoListComponent implements OnChanges{
  perPageCount: number = 10;
  currentPage: number = 1;
  perPageOptions: number[] = [10, 20, 50, 100];
  repos: any[] = [];
  totalPages: number = 0;

  @Input() user: any = {};

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnChanges(changes: any): void {
    this.currentPage = 1;
    this.perPageCount = 10;
    this.getRepos();
  }

  getTotalPageArray(): number[] {
    this.totalPages = Math.ceil(this.user.public_repos / this.perPageCount);
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
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
