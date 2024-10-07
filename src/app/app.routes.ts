import { RouterModule, Routes } from '@angular/router';
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
