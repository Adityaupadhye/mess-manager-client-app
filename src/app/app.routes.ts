import { Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
    {
        path: 'student/home',
        component: StudentHomeComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    }
];
