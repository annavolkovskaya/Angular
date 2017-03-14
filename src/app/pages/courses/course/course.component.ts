import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CourseObject, EditCourse, DeleteCourse } from '../../../models/course.model';

@Component ({
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  public editCourseText = 'Edit course';
  public deleteCourseText = 'Delete';
  @Output() public deleteCourse = new EventEmitter();

  @Input()
  public courseData: CourseObject;

  public deleteCourseCallback = (id) => {
    this.deleteCourse.emit(id);
  }

  public editCourse = () => {
    return true;
  }
}
