import { Injectable } from '@angular/core';
import { CourseObject } from '../models/course.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Response, RequestOptions, RequestMethod, URLSearchParams, Request } from '@angular/http';
import { AuthorizedHttp } from '../core/utils/authorizedHttp';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from '../state/main.state';

import { updateList, deleteCourse, currentCourse, updateCourse } from '../actions/courses.actions';
let COURSES: CourseObject[];

export interface GetListInteface {
  courses: CourseObject[];
  totalNumber: number;
  currentPage: number;
}

@Injectable()
export class CoursesService {
  public baseUrl: string;

  constructor(
    private http: AuthorizedHttp,
    private store: Store<State>,
    private router: Router
  ) {
    this.baseUrl = 'http://localhost:3004';
    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        if (state.coursesNeedUpdate) {
          this.getList(state.currentPage, state.searchQuery);
        }
      });
  }

  public getCourse(id: number): void {
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    let request: Request;
    requestOptions.url = `${this.baseUrl}/courses/${id}`;
    requestOptions.method = RequestMethod.Get;

    requestOptions.search = params;
    request = new Request(requestOptions);
    this.http.request(request).map((res) => {
      return res.json().course;
    })
    .subscribe((course) => {
      this.store.dispatch(currentCourse(course));
    });
  }

  public getList(pageNumber: number, query?: string): void {
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
    this.http.request(request)
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
                      const a = !!course &&
                             new Date(course.date).getTime() >=
                             (new Date().getTime() - 14 * millisecondsInDay);
                      return a;
                      }),
                      totalNumber: json.totalNumber,
                      currentPage: json.currentPage
                    };
                    })
                    .catch(AuthService.handleError)
                    .subscribe((result) =>
                      this.store.dispatch(updateList(result))
                    );

   };
  public createCourse(course: CourseObject): void {
    console.log('Create course');
  };
  public getItemById(id: Number): void {
    console.log(id);
  };
  public updateItem(course: CourseObject): void {
    let requestOptions = new RequestOptions();
    const date = new Date(course.date.split('/').reverse().join('/'));
    const formattedDate = date.toISOString().replace('.000Z', '+00:00');
    requestOptions.body = {...Object.assign({}, course, { date: formattedDate })};
    this.http.post(`${this.baseUrl}/courses/update`, requestOptions)
      .catch(AuthService.handleError)
      .subscribe({
        complete: () => {
        this.store.dispatch(updateCourse());
        this.router.navigate(['/courses']);
      }});
  }
  public removeItem(id: Number): void {
    let requestOptions = new RequestOptions();
    let body = { id };
    requestOptions.body = body;
    this.http.delete(`${this.baseUrl}/courses`, requestOptions)
      .map((response) => response.json())
      .catch(AuthService.handleError)
      .subscribe(() => {
        this.store.dispatch(deleteCourse());
      });
  };
}
