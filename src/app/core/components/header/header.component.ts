import {
  Component
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CoursesService } from '../../../services/courses.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';

@Component ({
  selector: 'header-component',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public currentUser: String = '';
  public logOffText = 'Log off';
  public logInText = 'Log in';
  public courseName: String;
  public loggedIn: boolean;

  constructor(
    public authService: AuthService,
    public coursesService: CoursesService,
    public router: Router,
    public store: Store<State>
  ) {
    this.store.select('combinedReducer', 'authStoreReducer')
      .subscribe((state: State) => {
        this.currentUser = state.username;
        this.loggedIn = state.isLoggedIn;
      });

    this.store.select('combinedReducer', 'coursesStoreReducer')
      .subscribe((state: State) => {
        this.courseName = state.currentCourse && state.currentCourse.title;
      });
  }

  public logOff = () => {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
