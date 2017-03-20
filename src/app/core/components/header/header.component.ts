import {
  Component
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component ({
  selector: 'header-component',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public logOffText = 'Log off';

  constructor(
    public authService: AuthService
  ) {}

  public logOff = () => {
    this.authService.logout();
  }
}
