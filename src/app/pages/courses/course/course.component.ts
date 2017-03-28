import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CourseObject, EditCourse, DeleteCourse } from '../../../models/course.model';
import { SpinnerService } from '../../../services/spinner.service';

@Component ({
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent {
  public editCourseText = 'Edit course';
  public deleteCourseText = 'Delete';

  @Output()
  public deleteCourse = new EventEmitter();

  @Input()
  public courseData: CourseObject;

  constructor(private spinnerService: SpinnerService) {}
  public deleteCourseCallback = (id) => {
    this.deleteCourse.emit(id);
    this.spinnerService.hide();
  }

  public editCourse = () => {
    return true;
  }
}
