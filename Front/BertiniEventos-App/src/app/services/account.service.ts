import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { environment } from '@environment/environment';
import { response } from 'express';
import { BehaviorSubject, map, Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  get currentUserValue(): User | null {
    return this.currentUserSource.value;
  }
  baseUrl = environment.apiURL + 'api/account/';

  constructor(private http: HttpClient) {}

  public login(model: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'Login', model).pipe(
      take(1),
      map((user: User) => {
        if (user) {
          //localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  public register(model: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'RegisterUser', model).pipe(
      take(1),
      map((user: User) => {
        if (user) {
          //localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  public getUser(): Observable<UserUpdate> {
    const userString = localStorage.getItem('user');
    const token = userString ? JSON.parse(userString).token : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<UserUpdate>(this.baseUrl + 'GetUser', { headers })
      .pipe(take(1));
  }

  public updateUser(model: UserUpdate): Observable<void> {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!).token
      : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<UserUpdate>(this.baseUrl + 'UpdateUser', model, { headers })
      .pipe(
        take(1),
        map((user: UserUpdate) => {
          this.setCurrentUser(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    //this.currentUserSource.complete();
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public postUpload(file: File): Observable<UserUpdate> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<UserUpdate>(`${this.baseUrl}upload-image`, formData)
      .pipe(take(1));
  }
}
