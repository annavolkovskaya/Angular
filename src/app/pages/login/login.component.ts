import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';

@Component ({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  public enterText = 'Enter';
  public username: String;
  public password: String;
  public loggedIn: Boolean;

  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.authService.loggedIn.subscribe((value) => {
      this.loggedIn = !!value;
      if (this.loggedIn) {
        this.redirect();
      }
    });
  }

  public redirect() {
    const returnUrlString = 'returnUrl=';
    const { url } = this.router;
    const navigateUrl = url.slice(url.indexOf(returnUrlString) + returnUrlString.length);
    if (!navigateUrl) {
      this.router.navigate(['/courses']);
    } else {
      this.router.navigate([decodeURIComponent(navigateUrl)]);
    }
  }

  public login = () => {
    this.spinnerService.show();
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (userData) => {
          localStorage.setItem('userToken', userData);
          this.ref.markForCheck();
          this.redirect();
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
