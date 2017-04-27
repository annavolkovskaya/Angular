import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { CoursesService } from '../../../services/courses.service';
import { CourseObject } from '../../../models/course.model';
import { AuthService } from '../../../services/auth.service';

@Component ({
  selector: 'search-component',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html'
})

export class SearchComponent {
  public findText = 'Find';
  public addCourseText = 'Add course';

  @Input() public addCourse: Function;
  @Input() public currentCourses: CourseObject[];
  @Input() public totalNumber: number;
  @Input() public searchQuery: string;
  @Output() public currentCoursesChange = new EventEmitter();
  @Output() public totalNumberChange = new EventEmitter();
  @Output() public searchQueryChange = new EventEmitter();

  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    public authService: AuthService
  ) { }

  public findCourseCallback = (query) => {
    this.spinnerService.show();
    this.coursesService.getList(0, this.searchQuery)
      .subscribe({
        next: (list) => {
          this.currentCourses = list.courses;
          this.totalNumber = list.totalNumber;
          this.totalNumberChange.emit(this.totalNumber);
          this.currentCoursesChange.emit(this.currentCourses);
        },
        complete: () => {
          this.searchQueryChange.emit(this.searchQuery);
          this.spinnerService.hide();
        }
      });
  }
}
