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
        path: 'student/menu',
        component: MenuStudentComponent,
    },
    {
        path: 'student/rebate',
        component: RebateStudentComponent,
    },
    {
        path: 'auth/login', // Public Route
        component: LoginComponent
    },
    {
        path: 'admin/chart',  // Protected route
        component : GetChartComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'admin/dashboard', // Protected route
        component : DashboardComponent,
    },
    {
        path: 'admin/rebate',
        component : RebateComponent,
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
