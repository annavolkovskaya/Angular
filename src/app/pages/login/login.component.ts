import {
  Component
} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component ({
  selector: 'login-page',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  public enterText = 'Enter';
  public username: String;
  public password: String;

  constructor(
    private authService: AuthService
  ) {}

  public login = () => {
    this.authService.login(this.username, this.password);
  }
}
