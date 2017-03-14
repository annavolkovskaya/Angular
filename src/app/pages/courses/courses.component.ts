import {
  Component
} from '@angular/core';
import { COURSES } from './course/courses.mock';

@Component ({
  selector: 'courses-component',
  templateUrl: './courses.component.html'
})

export class CoursesComponent {
  public courses = COURSES;

  public handleDeleteCourse(id) {
    console.log(id);
  }
}
