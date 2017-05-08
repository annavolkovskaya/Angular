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

import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';
import { disableEditMode } from '../../../actions/courses.actions';

@Component ({
  template: `
		<add-course-component></add-course-component>
	`
})

export class EditCourseComponent implements OnInit, OnDestroy {
  public course: CourseObject;
  public loggedIn: Boolean;
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private authService: AuthService,
    private store: Store<State>
  ) {
    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        this.course = state.currentCourse;
      });
  }

  public ngOnDestroy() {
    this.store.dispatch(disableEditMode());
  }

  public ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.courseService.getCourse(value['id']);
    });
  }
}
