import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component ({
  selector: 'search-component',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent {
  public findText = 'Find';
  public addCourseText = 'Add course';
  public searchQuery = '';
  public findCallback = (value) => {
    console.log(value);
  }

  public addCourse = () => {
    return true;
  }
}
