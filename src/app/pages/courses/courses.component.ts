import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';
import { CourseObject } from '../../models/course.model';
import { AuthorObject } from '../../models/author.model';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { AuthService } from '../../services/auth.service';
import { AuthorsService } from '../../services/authors.service';

@Component ({
  selector: 'courses-component',
  templateUrl: './courses.component.html',
  providers: [CoursesService, AuthorsService]
})

export class CoursesComponent {
  public addCourseMode = false;
  public currentPage: number;
  public courses: CourseObject[];
  public authors: AuthorObject[];
  public totalNumber: number;
  public searchQuery: string;

  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private authorsService: AuthorsService,
    private ref: ChangeDetectorRef
  ) {
    this.currentPage = 0;
    this.searchQuery = '';
    this.authService.loggedIn.subscribe(
      (value) => {
        if (!value) {
          this.addCourseMode = false;
        }
      }
    );
  }

  public resetAddCourseMode() {
    this.addCourseMode = false;
  }

  public handleDeleteCourse(id) {
    this.spinnerService.show();
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.removeItem(id).subscribe({
        next: (value) => this.ref.markForCheck(),
        error: (err) => alert('something wrong occurred: ' + err),
        complete: () => {
          this.spinnerService.hide();
          if (this.courses.length === 1) {
            this.currentPage--;
          }
          this.getList(this.currentPage);
        }
      });
    } else {
      this.spinnerService.hide();
    }
  }
  public handleAddCourse = () => {
    this.addCourseMode = true;
    this.authorsService.getList()
      .subscribe((authors) => {
        this.authors = authors.authors;
      });
  }
  public getList(pageNumber: number) {
    this.spinnerService.show();
    this.coursesService.getList(pageNumber, this.searchQuery)
      .subscribe({
        next: (list) => {
          this.courses = list.courses;
          this.totalNumber = list.totalNumber;
          this.currentPage = list.currentPage;
        },
        complete: () => this.spinnerService.hide()
      });
  }
}
