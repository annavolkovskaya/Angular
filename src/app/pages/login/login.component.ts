import {
  Component,
  ChangeDetectionStrategy,
  Input,
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
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (token) => {
          this.spinnerService.show();
          localStorage.setItem('token', token);
          this.authService.loggedIn.next(this.username);
          this.ref.markForCheck();
        },
        error: (err) => console.error('something wrong occurred: ' + err),
        complete: () => this.spinnerService.hide()
      });
   }
}
