import {
  Component,
  OnInit
} from '@angular/core';

@Component ({
  selector: 'login-component',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public ngOnInit() {
    console.log('hello Course component');
  }
}
