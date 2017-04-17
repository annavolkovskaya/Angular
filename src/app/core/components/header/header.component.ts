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
    this.authService.loggedIn
      .subscribe((value) => this.currentUser = value ? value : null);
  }

  public logOff = () => {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return !!this.authService.loggedIn.value;
  }

}
