import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  Input,
  OnChanges,
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

@Component ({
  selector: 'add-course-component',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
  providers: [AuthorsService]
})

export class AddCourseComponent implements OnInit, OnChanges {
  public saveBtnText = 'Save';
  public cancelBtnText = 'Cancel';
  public authors: AuthorObject[];
  public checkedAuthors: AuthorObject[] = [];
  @Input() public courseInfo?: CourseObject;
  @Input() public validateOnRender?: Boolean;
  @Input() public editingCourseMode?: Boolean;

  constructor(
    private authorsService: AuthorsService,
    private spinnerService: SpinnerService,
    private courseService: CoursesService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  public saveChanges = (form) => {
    if (!this.editingCourseMode) {
      this.router.navigate(['/courses']);
      return;
    }
    this.spinnerService.show();
    this.courseService.updateItem({
      id: this.courseInfo.id,
      ...form.value,
      authors: this.checkedAuthors
    }).subscribe({
        error: (err) => alert('something wrong occurred: ' + err),
        complete: () => {
          this.router.navigate(['/courses']);
          this.spinnerService.hide();
        }
      });
  }

  public ngOnChanges(changes) {
    this.checkedAuthors = (changes.courseInfo.currentValue &&
                          changes.courseInfo.currentValue.authors) || [];
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
