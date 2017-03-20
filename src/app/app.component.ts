/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { AuthService } from './services/auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
      <header-component></header-component>
      <login-page *ngIf="!this.authService.isAuthenticated()"></login-page>
      <search-component *ngIf="this.authService.isAuthenticated()"></search-component>
      <courses-component *ngIf="this.authService.isAuthenticated()"></courses-component>
      <footer-component></footer-component>
    </main>
  `
})
export class AppComponent implements OnInit {
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    public authService: AuthService
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
