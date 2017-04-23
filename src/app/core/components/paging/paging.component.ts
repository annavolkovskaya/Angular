import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { CourseObject } from '../../../models/course.model';
import { CoursesService, GetListInteface } from '../../../services/courses.service';

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

export class PagingComponent implements OnInit {
  @Input()
  public currentPage: number;
  @Input()
  public totalNumber: number;
  @Input()
  public currentCourses: CourseObject[];
  @Input()
  public searchQuery: string;
  @Output()
  public currentCoursesChange = new EventEmitter();
  @Output()
  public currentPageChange = new EventEmitter();

  public backText: string;
  public forwardText: string;

  private subscriptionObject = {
    next: (list) => this.handleJson(list),
    complete: () => this.spinnerService.hide()
  };

  constructor(
    private coursesService: CoursesService,
    private spinnerService: SpinnerService
    ) {
    this.backText = 'Go Back';
    this.forwardText = 'Go Forward';
  }

  public goBack = () => {
    this.spinnerService.show();
    this.coursesService.getList(--this.currentPage, this.searchQuery)
        .subscribe(this.subscriptionObject);
  }

  public goForward = () => {
    this.spinnerService.show();
    this.coursesService.getList(++this.currentPage, this.searchQuery)
        .subscribe(this.subscriptionObject);
  }

  public ngOnInit() {
    this.coursesService.getList(0)
      .subscribe(this.subscriptionObject);
  }

  private handleJson(list: GetListInteface) {
    this.currentCourses = list.courses;
    this.totalNumber = list.totalNumber;
    this.currentPage = list.currentPage;
    this.currentCoursesChange.emit(this.currentCourses);
    this.currentPageChange.emit(this.currentPage);
  }
}
