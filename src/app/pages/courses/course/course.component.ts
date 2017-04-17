import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { CourseObject, EditCourse, DeleteCourse } from '../../../models/course.model';
import { SpinnerService } from '../../../services/spinner.service';

@Component ({
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent implements OnInit {
  public editCourseText = 'Edit course';
  public deleteCourseText = 'Delete';

  @Output()
  public deleteCourse = new EventEmitter();

  @Input()
  public courseData: CourseObject;
  public isFavourite = false;

  constructor(private spinnerService: SpinnerService) {}
  public deleteCourseCallback = (id) => {
    this.deleteCourse.emit(id);
  }

  public editCourse = () => {
    return true;
  }

  public ngOnInit(): void {
    this.getCourseStyles(this.courseData);
  }

  public getCourseStyles(courseData) {
    this.isFavourite = courseData.topRated;
  }
}
