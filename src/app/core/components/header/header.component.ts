import {
  Component
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CoursesService } from '../../../services/courses.service';
import { Router } from '@angular/router';

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

  constructor(
    public authService: AuthService,
    public coursesService: CoursesService,
    public router: Router
  ) {
    this.authService.loggedIn
        .subscribe((value) => this.currentUser = value ? value : null);
    this.coursesService.currentCourseTitle
        .subscribe((value) => {
          this.courseName = value;
        });
  }

  public logOff = () => {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return !!this.authService.loggedIn.value;
  }
}
