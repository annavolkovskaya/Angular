import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { PageNotFoundComponent } from './core/components/pageNotFound/pageNotFound.component';
import { AddCourseComponent } from './pages/courses/addCourse/addCourse.component';
import { EditCourseComponent } from './pages/courses/editCourse/editCourse.component';
import { LoginComponent } from './pages/login/login.component';
import { CanActivateViaAuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses/new', component: AddCourseComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'courses/:id', component: EditCourseComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];
