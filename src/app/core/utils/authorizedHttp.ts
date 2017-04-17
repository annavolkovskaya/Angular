import { Http, Headers, Response, RequestOptions, Request, ConnectionBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizedHttp extends Http {
  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptions): Observable<Response> {
    let request: Request;
    if (typeof url === 'string') {
      options.url = url;
      this.createAuthorizationHeader(options.headers);
      request = new Request(options);
    } else {
      this.createAuthorizationHeader(url.headers);
      request = url;
    }
    return super.request(request);
  }

  private createAuthorizationHeader(headers: Headers) {
    if (localStorage.getItem('userToken')) {
      headers.append('Authorization', localStorage.getItem('userToken'));
    }
  }
}
