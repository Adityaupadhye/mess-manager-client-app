import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
