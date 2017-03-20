import {
  Component,
  OnInit
} from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CourseObject } from '../../models/course.model';

@Component ({
  selector: 'courses-component',
  templateUrl: './courses.component.html',
  providers: [CoursesService]
})

export class CoursesComponent implements OnInit {
  public courses: CourseObject[];

  constructor(
    private coursesService: CoursesService
  ) {}

  public handleDeleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.removeItem(id);
    }
  }

  public ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }
}
