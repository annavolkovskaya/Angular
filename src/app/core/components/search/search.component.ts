import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component ({
  selector: 'search-component',
  styleUrls: ['./search.component.css'],
  templateUrl: './search.component.html'
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
