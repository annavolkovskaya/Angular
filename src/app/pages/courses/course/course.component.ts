import {
  Component,
  OnInit
} from '@angular/core';
import { CourseObject, EditCourse, DeleteCourse } from '../../../models/course.model';

@Component ({
  templateUrl: './course.component.html'
})

export class CourseComponent implements OnInit {
    public ngOnInit() {
    console.log('hello Course component');
  }
}
