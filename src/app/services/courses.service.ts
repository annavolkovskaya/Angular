import { Injectable } from '@angular/core';
import { CourseObject } from '../models/course.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Response, RequestOptions, RequestMethod, URLSearchParams, Request } from '@angular/http';
import { AuthorizedHttp } from '../core/utils/authorizedHttp';

let COURSES: CourseObject[];

export interface GetListInteface {
  courses: CourseObject[];
  totalNumber: number;
  currentPage: number;
}

@Injectable()
export class CoursesService {
  public baseUrl: string;
  constructor(private http: AuthorizedHttp) {
    this.baseUrl = 'http://localhost:3004';
  }
  public getList(pageNumber: number, query?: string): Observable<GetListInteface> {
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    let request: Request;
    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Get;
    params.set('count', '5');
    params.set('page', `${pageNumber}`);
    params.set('search', query);

    requestOptions.search = params;
    request = new Request(requestOptions);
    const millisecondsInDay = 86400 * 1000;
    return this.http.request(request)
                    .map((res) => res.json())
                    .map((json) => {
                      return {
                        courses: json.courses.map((course) => {
                        if (!course.id) {
                          return null;
                        }
                        return {
                          title: course.title || 'No title',
                          description: course.description || 'No description',
                          date: course.date || new Date().toISOString(),
                          duration: course.duration || null,
                          id: course.id,
                          topRated: course.topRated || false
                        };
                      })
                      .filter((course) => {
                      return !!course &&
                             new Date(course.date).getTime() >=
                             (new Date().getTime() - 14 * millisecondsInDay);
                      }),
                      totalNumber: json.totalNumber,
                      currentPage: json.currentPage
                    };
                    })
                    .catch(AuthService.handleError);
   };
  public createCourse(course: CourseObject): void {
    console.log('Create course');
  };
  public getItemById(id: Number): void {
    console.log(id);
  };
  public updateItem(course: CourseObject): void {
    console.log('Update');
  }
  public removeItem(id: Number): Observable<Boolean> {
    let requestOptions = new RequestOptions();
    let body = { id };
    requestOptions.body = body;
    return this.http.delete(`${this.baseUrl}/courses`, requestOptions)
      .map((response) => response.json())
      .catch(AuthService.handleError);
  };
}
