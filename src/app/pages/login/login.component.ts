import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from '../../services/spinner.service';

@Component ({
  selector: 'login-page',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  public enterText = 'Enter';
  public username: String;
  public password: String;

  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private spinnerService: SpinnerService
  ) {}

  public login = () => {
    this.spinnerService.show();
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (userData) => {
          localStorage.setItem('userToken', userData);
          this.ref.markForCheck();
        },
        error: (err) => {
          alert('something wrong occurred: ' + err);
          this.spinnerService.hide();
        },
        complete: () => {
          this.spinnerService.hide();
          this.authService.loggedIn.next(this.username);
        }
      });
   }
}
