import { Routes } from '@angular/router';
import { CourseComponent } from './pages/courses/course/course.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: CourseComponent }
];
