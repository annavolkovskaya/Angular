import { Routes } from '@angular/router';
import { CourseComponent } from './pages/courses/course/course.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: AppComponent }
];
