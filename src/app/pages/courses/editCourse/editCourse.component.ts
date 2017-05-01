import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Params, CanActivate } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { CourseObject } from '../../../models/course.model';
import { AuthService } from '../../../services/auth.service';

@Component ({
  template: `
		<add-course-component
      [courseInfo]="course"
      editingCourseMode={{true}}
      validateOnRender={{true}}></add-course-component>
	`
})

export class EditCourseComponent implements OnInit, OnDestroy {
  public course: CourseObject;
  public loggedIn: Boolean;
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private authService: AuthService
  ) { }

  public ngOnDestroy() {
    this.courseService.currentCourseTitle.next(null);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.courseService.getCourse(value.id).subscribe((course) => {
        this.course = course;
      });
    });
  }
}
