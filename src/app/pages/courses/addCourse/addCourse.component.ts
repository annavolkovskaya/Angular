import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { AuthorObject } from '../../../models/author.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateAuthors } from '../../../validators/authors.validator';
import { AuthorsService } from '../../../services/authors.service';
import { SpinnerService } from '../../../services/spinner.service';
import { CoursesService } from '../../../services/courses.service';
import { CourseObject } from '../../../models/course.model';

import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';

@Component ({
  selector: 'add-course-component',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
  providers: [AuthorsService]
})

export class AddCourseComponent implements OnInit {
  public saveBtnText = 'Save';
  public cancelBtnText = 'Cancel';
  public authors: AuthorObject[];
  public checkedAuthors: AuthorObject[] = [];
  public courseInfo?: CourseObject;
  public editingCourseMode?: Boolean;

  constructor(
    private authorsService: AuthorsService,
    private spinnerService: SpinnerService,
    private courseService: CoursesService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store<State>
  ) {
    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        this.courseInfo = state.currentCourse;
        this.checkedAuthors = state.currentCourse && state.currentCourse.authors;
        this.editingCourseMode = state.editCourseMode;
      });
  }

  public saveChanges = (form) => {
    if (!this.editingCourseMode) {
      this.router.navigate(['/courses']);
    }
    this.spinnerService.show();
    this.courseService.updateItem({
      id: this.courseInfo.id,
      ...form.value,
      authors: this.checkedAuthors
    });
  }

  public ngOnInit() {
    this.spinnerService.show();
    this.authorsService.getList()
      .subscribe({
        next: (authors) => {
          this.authors = authors.authors;
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
  }
}
