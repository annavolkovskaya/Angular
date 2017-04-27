import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AuthorObject } from '../../../models/author.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateAuthors } from '../../../validators/authors.validator';

@Component ({
  selector: 'add-course-component',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddCourseComponent {
  public saveBtnText = 'Save';
  public cancelBtnText = 'Cancel';
  @Output()
  public cancelAddCourseMode = new EventEmitter();
  @Input() public authors: AuthorObject[];
  public saveChanges = (form) => {
    console.log(form.value);
  }

  public onCancelButtonClick = () => {
    this.cancelAddCourseMode.emit();
  }
}
