import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  loadingRepos: boolean = true;

  @Input() user: any = {};

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnChanges(): void {
    this.resetOnChange();
    this.getRepos();
  }

  resetOnChange() {
    this.currentPage = 1;
    this.perPageCount = 10;
    this.loadingRepos = true;
  }

  getTotalPageArray(): number[] {
    this.totalPages = Math.ceil(this.user.public_repos / this.perPageCount);
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadingRepos = true;
      this.getRepos();
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadingRepos = true;
      this.getRepos();
    }
  }

  onPage(page: number): void {
    this.currentPage = page;
    this.loadingRepos = true;
    this.getRepos();
  }

  onChangePerPage() {
    this.currentPage = 1;
    this.loadingRepos = true;
    this.getRepos();
  }

  getRepos() {
    this.apiService.getUserRepos(this.user.login, this.currentPage, this.perPageCount).subscribe(
      repos => {
        this.repos = repos;
        this.loadingRepos = false;
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    );
  }
}
