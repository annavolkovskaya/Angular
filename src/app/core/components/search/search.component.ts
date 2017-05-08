import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { CoursesService } from '../../../services/courses.service';
import { CourseObject } from '../../../models/course.model';

import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';

import { search } from '../../../actions/courses.actions';
@Component ({
  selector: 'search-component',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html'
})

export class SearchComponent {
  public findText = 'Find';
  public addCourseText = 'Add course';
  public isAuth: boolean = false;
  public searchQuery: string;
  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    private store: Store<State>
  ) {
    this.store.select('combinedReducer', 'authStoreReducer')
      .subscribe((state: State) => this.isAuth = state.isLoggedIn);

    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => this.searchQuery = state.searchQuery);
  }

  public findCourseCallback = (query) => {
    this.spinnerService.show();
    this.store.dispatch(search(query));
  }
}
