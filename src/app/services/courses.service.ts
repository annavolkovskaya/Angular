import { Injectable } from '@angular/core';
import { CourseObject } from '../models/course.model';

let COURSES: CourseObject[] = [{
  title: 'Video course1',
  duration: 45,
  description: 'Lorem ipsum',
  creationDate: '22.12.2010',
  id: 1
}, {
  title: 'Video course2',
  duration: 45,
  description: 'Lorem ipsum',
  creationDate: '22.12.2010',
  id: 2
}, {
  title: 'Video course3',
  duration: 45,
  description: 'Lorem ipsum',
  creationDate: '22.12.2010',
  id: 3
}];

@Injectable()
export class CoursesService {
  public getList(): CourseObject[] { return COURSES; };
  public createCourse(course: CourseObject): void { COURSES.push(course); };
  public getItemById(id: Number): CourseObject {
    return COURSES.find((course) => course.id === id);
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
