import { Injectable } from '@angular/core';
import { CourseObject } from '../models/course.model';
import { Observable, BehaviorSubject } from 'rxjs';

let COURSES: CourseObject[];
let fakeResponse: string = `{
  "items": [
    {
      "title": "Video course1",
      "duration": 45,
      "description": "Lorem ipsum",
      "id": 1,
      "date": "2017-04-11T18:57:52.029Z",
      "topRated": true,
      "isSelected": true
    },
    {
      "title": "Video course2",
      "duration": 140,
      "description": "Lorem ipsum",
      "date": "2015-01-01T18:57:52.029Z",
      "id": 2
    },
    {
      "title": "Video course3",
      "duration": 60,
      "description": "Lorem ipsum",
      "date": "2017-05-01T18:57:52.029Z",
      "id": 3
    }
  ]
}`;

@Injectable()
export class CoursesService {
  public getList(): Observable<CourseObject[]> {
    const items = new Observable((observer) => {
      const millisecondsInDay = 86400 * 1000;
      const fakeCourses = JSON.parse(fakeResponse);
      observer.next(
        fakeCourses.items
        .map((course) => {
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
                 new Date(course.date).getTime() >= (new Date().getTime() - 14 * millisecondsInDay);
        })
      );
    });
    items.subscribe((value: CourseObject[]) => COURSES = value);
    return items;
   };
  public createCourse(course: CourseObject): void { COURSES.push(course); };
  public getItemById(id: Number): Observable<CourseObject> {
    return new Observable((obsever) => {
      obsever.next(COURSES.find((course) => course.id === id));
      obsever.complete();
    });
  };
  public getFilteredCourses(query: string): CourseObject[] {
    return COURSES.filter((course) => course.title.includes(query));
  };
  public updateItem(course: CourseObject): void {
    this.getItemById(course.id).subscribe((updatedCourse) => {
      let index = COURSES.findIndex((c) => c.id === course.id);
      COURSES[index] = updatedCourse;
    })
    .unsubscribe();
  }
  public removeItem(id: Number): void {
    const index = COURSES.findIndex((course) => course.id === id);
    COURSES.splice(index, 1);
    fakeResponse = JSON.stringify({ items: COURSES });
  };
}
