import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { LoginComponent } from './Auth/login/login.component';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { NgModule } from '@angular/core';
import { GetChartComponent } from './charts/get-chart/get-chart.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RebateComponent } from './rebate/rebate/rebate.component';
import { MenuStudentComponent } from './student/menu-student/menu-student.component';
import { RebateStudentComponent } from './student/rebate-student/rebate-student.component';
import { studentauthGuard } from './services/guard_student/studentauth.guard';
import { adminauthGuard } from './services/guard_admin/adminauth.guard';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login', //Default route
    },
    {
        path: 'student/home',
        component: StudentHomeComponent,
        canActivate: [studentauthGuard]
    },
    {
        path: 'student/menu',
        component: MenuStudentComponent,
        canActivate: [studentauthGuard]
    },
    {
        path: 'student/rebate',
        component: RebateStudentComponent,
        canActivate: [studentauthGuard]
    },
    {
        path: 'admin/scan',
        component: ScannerComponent,
        canActivate: [adminauthGuard]
    },
    {
        path: 'auth/login', // Public Route
        component: LoginComponent
    },
    {
        path: 'admin/chart',  // Protected route
        component : GetChartComponent,
        canActivate: [adminauthGuard]
    },
    {
        path: 'admin/dashboard', // Protected route
        component : DashboardComponent,
        canActivate: [adminauthGuard]
    },
    {
        path: 'admin/rebate',
        component : RebateComponent,
        canActivate: [adminauthGuard]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
