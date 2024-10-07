import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { LoginComponent } from './Auth/login/login.component';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin/scan',
    },
    {
        path: 'admin/scan',
        component: ScannerComponent
    },
    {
        path: 'student/home',
        component: StudentHomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin/scan',
    },
    {
        path: 'admin/scan',
        component: ScannerComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
