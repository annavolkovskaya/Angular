import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { CourseComponent } from './pages/courses/course/course.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { PagingComponent } from './core/components/paging/paging.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SearchComponent } from './core/components/search/search.component';
import { ButtonComponent } from './core/components/button/button.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { EmptyComponent } from './core/components/emptyBlock/emptyBlock.component';
import { StarComponent } from './core/components/star/star.component';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { DatePipe } from './pipes/date.pipe';
import { DateValidatorDirective } from './directives/dateValidator.directive';
import { BorderDirective } from './directives/border.directive';
import { AddCourseComponent } from './pages/courses/addCourse/addCourse.component';
import { AuthorizedHttp } from './core/utils/authorizedHttp';
import { DateFieldComponent } from './core/components/dateField/dateField.component';
import { DurationFieldComponent } from './core/components/durationField/durationField.component';
import { DurationValidatorDirective } from './directives/durationValidator.directive';
import { AuthorsComponent } from './core/components/authorsBlock/authorsBlock.component';
import { PageNotFoundComponent } from './core/components/pageNotFound/pageNotFound.component';
import { ROUTES } from './app.routes';
import { EditCourseComponent } from './pages/courses/editCourse/editCourse.component';
import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CoursesService } from './services/courses.service';
import { combinedReducer } from './reducers/combined.reducers';
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    BorderDirective,
    CourseComponent,
    CoursesComponent,
    PagingComponent,
    HeaderComponent,
    LogoComponent,
    SearchComponent,
    ButtonComponent,
    FooterComponent,
    SpinnerComponent,
    EmptyComponent,
    StarComponent,
    DurationPipe,
    OrderByPipe,
    AddCourseComponent,
    DateFieldComponent,
    DateValidatorDirective,
    DurationFieldComponent,
    DurationValidatorDirective,
    AuthorsComponent,
    PageNotFoundComponent,
    EditCourseComponent,
    LoginComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    StoreModule.provideStore({combinedReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    {
      provide: AuthorizedHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new AuthorizedHttp(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    ENV_PROVIDERS,
    APP_PROVIDERS,
    CanActivateViaAuthGuard,
    AuthService,
    CoursesService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}
  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
