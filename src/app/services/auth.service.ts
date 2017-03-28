import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface UserInfo {
  username: String;
  password: String;
};

@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject(null);
  private userInfo: UserInfo;
  private defaultUser: UserInfo = {
    username: '',
    password: ''
  };

  constructor() {
    let userToken = localStorage.getItem('token');
    let userCreds = userToken ? userToken.split('_') : false;
    this.userInfo = userToken ? {
      username: userCreds[0],
      password: userCreds[1]
    } : this.defaultUser;
  }
  public login (username: String, password: String): Observable<string> {
    return new Observable((observer) => {
      observer.next(`${username}_${password}`);
      observer.complete();
    });
  };

  public logout(): void {
    this.loggedIn.subscribe((value) => {
      this.userInfo = this.defaultUser;
      localStorage.removeItem('token');
    });
  };

  public isAuthenticated(): void {
    Observable.from([this.userInfo.username]).
      subscribe((value) => this.loggedIn.next(value));
  };

  public getUserInfo(): Observable<String> {
    return new Observable((observer) => {
      observer.next(this.userInfo.username);
      observer.complete();
    });
  };
}
