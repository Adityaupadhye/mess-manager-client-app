import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { LoginComponent } from './Auth/login/login.component';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { NgModule } from '@angular/core';
import { GetChartComponent } from './charts/get-chart/get-chart.component';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login', //Default route
    },
    {
        path: 'admin/scan',
        component: ScannerComponent
    },
    {
        path: 'student/home',
        component: StudentHomeComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'auth/login', // Public Route
        component: LoginComponent
    },
    {
        path: 'admin/chart',  // Protected route
        component : GetChartComponent,
        // canActivate: [authGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
