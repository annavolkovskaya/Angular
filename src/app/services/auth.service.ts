import { Injectable } from '@angular/core';

interface UserInfo {
  username: String;
  password: String;
};

@Injectable()
export class AuthService {
  public user: UserInfo;
  private defaultUser: UserInfo = {
    username: '',
    password: ''
  };

  constructor() {
    this.user = this.defaultUser;
  }

  public login (username: String, password: String): Boolean {
    this.user.username = username;
    this.user.password = password;
    const token = `${username}${password}`;
    localStorage.setItem('token', token);
    return true;
  };

  public logout(): Boolean {
    this.user = this.defaultUser;
    localStorage.removeItem('token');
    return true;
  };

  public isAuthenticated(): Boolean {
    return !!localStorage.getItem('token');
  };

  public getUserInfo(): UserInfo {
    return this.user;
  };
}
