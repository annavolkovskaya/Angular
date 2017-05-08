import {
  Component,
  OnInit
} from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';
import { CourseObject } from '../../models/course.model';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';

import { Store } from '@ngrx/store';
import { State } from '../../state/main.state';
@Component ({
  selector: 'courses-component',
  templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
  public currentPage: number;
  public courses: CourseObject[];
  public totalNumber: number;
  public searchQuery: string;
  public addCourseMode: boolean;

  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    private store: Store<State>
  ) {
    this.currentPage = 0;
    this.searchQuery = '';
    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        this.courses = state.courses;
        this.currentPage = state.currentPage;
        this.totalNumber = state.totalNumber;
        this.searchQuery = state.searchQuery;
        this.addCourseMode = state.addCourseMode;
      });
  }

  public handleDeleteCourse(id) {
    this.spinnerService.show();
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.removeItem(id);
    }
  }

  public getList(pageNumber: number) {
    this.spinnerService.show();
    this.coursesService.getList(pageNumber, this.searchQuery);
  }

  public ngOnInit() {
    this.coursesService.getList(this.currentPage);
  }
}
