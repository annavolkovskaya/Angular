import { Injectable } from '@angular/core';
import { CourseObject } from '../models/course.model';

let COURSES: CourseObject[] = [{
  title: 'Video course1',
  duration: 45,
  description: 'Lorem ipsum',
  creationDate: '2017-03-30T18:57:52.029Z',
  id: 1,
  topRated: true
}, {
  title: 'Video course2',
  duration: 140,
  description: 'Lorem ipsum',
  creationDate: '2015-01-01T18:57:52.029Z',
  id: 2,
  topRated: false
}, {
  title: 'Video course3',
  duration: 60,
  description: 'Lorem ipsum',
  creationDate: '2017-05-01T18:57:52.029Z',
  id: 3,
  topRated: false
}];

@Injectable()
export class CoursesService {
  public getList(): CourseObject[] { return COURSES; };
  public createCourse(course: CourseObject): void { COURSES.push(course); };
  public getItemById(id: Number): CourseObject {
    return COURSES.find((course) => course.id === id);
  };
  public getFilteredCourses(query: string): CourseObject[] {
    return COURSES.filter((course) => course.title.includes(query));
  };
  public updateItem(course: CourseObject): void {
    let itemToUpdate = this.getItemById(course.id);
    itemToUpdate = course;
  }
  public removeItem(id: Number): void {
    const index = COURSES.findIndex((course) => course.id === id);
    COURSES.splice(index, 1);
  };
}
