import { Routes } from '@angular/router';
import { CourseComponent } from './pages/courses/course';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: CourseComponent }
];
