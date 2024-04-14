import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserDetails', () => {
    it('should return user details', () => {
      const dummyUsername = 'testuser';
      const dummyUserDetails = { login: 'testuser', name: 'Test User', followers: 10 };

      service.getUserDetails(dummyUsername).subscribe(userDetails => {
        expect(userDetails).toEqual(dummyUserDetails);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/users/${dummyUsername}`);
      req.flush(dummyUserDetails);
    });
  });

  describe('getUserRepos', () => {
    it('should return user repos', () => {
      const dummyUsername = 'testuser';
      const dummyPage = 1;
      const dummyPerPage = 10;
      const dummyRepos = [
        { name: 'repo1', html_url: 'url1', description: 'desc1', topics: ['topic1'], public_repos: 0 }, 
        { name: 'repo2', html_url: 'url2', description: 'desc2', topics: ['topic2'], public_repos: 0 }
      ];

      service.getUserRepos(dummyUsername, dummyPage, dummyPerPage).subscribe(repos => {
        expect(repos).toEqual(dummyRepos);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/users/${dummyUsername}/repos?page=${dummyPage}&per_page=${dummyPerPage}`);
      req.flush(dummyRepos);
    });

    it('should return cached user repos', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const dummyUsername = 'testuser';
      const dummyPage = 1;
      const dummyPerPage = 10;
      const dummyRepos = [
        { name: 'repo1', html_url: 'url1', description: 'desc1', topics: ['topic1'], public_repos: 0 }, 
        { name: 'repo2', html_url: 'url2', description: 'desc2', topics: ['topic2'], public_repos: 0 }
      ];

      service.getUserRepos(dummyUsername, dummyPage, dummyPerPage).subscribe();
      service.getUserRepos(dummyUsername, dummyPage, dummyPerPage).subscribe(repos => {
        expect(repos).toEqual(dummyRepos);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/users/${dummyUsername}/repos?page=${dummyPage}&per_page=${dummyPerPage}`);
      req.flush(dummyRepos);

      httpMock.expectNone(`${service.apiUrl}/users/${dummyUsername}/repos?page=${dummyPage}&per_page=${dummyPerPage}`);
    }));
  });
});
