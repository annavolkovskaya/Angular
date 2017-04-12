import {
  Component
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SpinnerService } from '../../../services/spinner.service';

@Component ({
  selector: 'header-component',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public currentUser: String = '';
  public logOffText = 'Log off';

  constructor(
    public authService: AuthService
  ) {
    if (this.authService.loggedIn.value === null) {
      this.authService.isAuthenticated();
    }
    this.authService.loggedIn
      .subscribe((value) => this.currentUser = value)
      .unsubscribe();

  }

  public logOff = () => {
    this.authService.loggedIn.next(false);
  }

  public isLoggedIn(): boolean {
    return this.authService.loggedIn.value;
  }

}
