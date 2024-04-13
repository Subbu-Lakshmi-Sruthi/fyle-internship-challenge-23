import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-github-repo-list',
  templateUrl: './github-repo-list.component.html',
  styleUrls: ['./github-repo-list.component.css']
})
export class GithubRepoListComponent {
  @Input() repositories: any = [];
}
