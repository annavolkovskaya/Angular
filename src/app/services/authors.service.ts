import { Injectable } from '@angular/core';
import { AuthorObject } from '../models/author.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RequestOptions, RequestMethod, URLSearchParams, Request } from '@angular/http';
import { AuthorizedHttp } from '../core/utils/authorizedHttp';

export interface GetListInteface {
  authors: AuthorObject[];
}

@Injectable()
export class AuthorsService {
  public baseUrl: string;
  constructor(private http: AuthorizedHttp) {
    this.baseUrl = 'http://localhost:3004';
  }
  public getList(): Observable<GetListInteface> {
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    let request: Request;
    requestOptions.url = `${this.baseUrl}/authors`;
    requestOptions.method = RequestMethod.Get;

    requestOptions.search = params;
    request = new Request(requestOptions);
    const millisecondsInDay = 86400 * 1000;
    return this.http.request(request)
                    .map((res) => res.json())
                    .catch(AuthService.handleError);
   };
}
