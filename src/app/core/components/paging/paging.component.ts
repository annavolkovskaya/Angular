import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { CourseObject } from '../../../models/course.model';
import { CoursesService, GetListInteface } from '../../../services/courses.service';

import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';

import { nextPage, prevPage } from '../../../actions/courses.actions';

@Component ({
  selector: 'paging',
  template: `
    <div class="paging" *ngIf="currentCourses && currentCourses.length> 0">
      <button-component
        *ngIf="currentPage > 0"
        [buttonClick] = "goBack"
        [buttonText]="backText">
      </button-component>
      <p>{{currentPage + 1}}</p>
      <button-component
        *ngIf="currentPage < totalNumber-1"
        [buttonClick] = "goForward"
        [buttonText]="forwardText">
      </button-component>
    </div>`,
  styles: [`
    .paging {
      display: flex;
    }

    p {
      margin: 0;
      display: block;
      width: 50px;
      text-align: center;
    }
  `]
})

export class PagingComponent {

  public backText: string;
  public forwardText: string;

  public currentPage: number;
  public totalNumber: number;
  public currentCourses: CourseObject[];
  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService,
    private store: Store<State>
  ) {
    this.backText = 'Go Back';
    this.forwardText = 'Go Forward';
    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        if (state) {
          this.currentCourses = state.courses;
          this.currentPage = state.currentPage;
          this.totalNumber = state.totalNumber;
        }
      });
  }

  public goBack = () => {
    this.spinnerService.show();
    this.store.dispatch(prevPage());
  }

  public goForward = () => {
    this.spinnerService.show();
    this.store.dispatch(nextPage());
  }
}
