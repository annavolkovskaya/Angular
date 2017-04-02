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
  public isFreshCourse = false;
  public isUcomingCourse = false;
  public isFavourite = false;

  constructor(private spinnerService: SpinnerService) {}
  public deleteCourseCallback = (id) => {
    this.deleteCourse.emit(id);
    this.spinnerService.hide();
  }

  public editCourse = () => {
    return true;
  }

  public ngOnInit(): void {
    this.getCourseStyles(this.courseData);
  }

  public getCourseStyles(courseData) {
    const currentDate: Date = new Date();
    const currentDateInSeconds = Date.parse(currentDate.toString());
    const creationDateInSeconds = Date.parse(courseData.creationDate.toString());
    const millisecondInDay = 86400 * 1000;
    const daysDifference = millisecondInDay * 14;
    this.isFreshCourse = creationDateInSeconds < currentDateInSeconds &&
                         creationDateInSeconds >= (currentDateInSeconds - daysDifference);
    this.isUcomingCourse = creationDateInSeconds > currentDateInSeconds;
    this.isFavourite = courseData.topRated;
  }
}
