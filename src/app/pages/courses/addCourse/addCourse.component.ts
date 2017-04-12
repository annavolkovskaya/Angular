import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component ({
  selector: 'add-course-component',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddCourseComponent {
  public saveBtnText = 'Save';
  public cancelBtnText = 'Cancel';
  public duration: string;
  public saveChanges = () => {
    console.log('Save changes');
  }
  public cancelChanges = () => {
    console.log('Cancel changes');
  }

  public handleDurationInputChange = (value) => {
    this.duration = value;
  }
}
