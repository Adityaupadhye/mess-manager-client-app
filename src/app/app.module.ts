import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialComponentsModule } from './shared-material-components/shared-material-components.module';
import { DbModuleModule } from './db-module/db-module.module';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { NavbarComponent } from "./common/navbar/navbar.component";
import { GetChartComponent } from './charts/get-chart/get-chart.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RebateComponent } from './rebate/rebate/rebate.component';
import { NavbarStudentComponent } from './student/navbar-student/navbar-student.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MenuStudentComponent } from './student/menu-student/menu-student.component';
import { RebateStudentComponent } from './student/rebate-student/rebate-student.component';


@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    NavbarComponent,
    GetChartComponent,
    DashboardComponent,
    RebateComponent,
    NavbarStudentComponent,
    StudentHomeComponent,
    MenuStudentComponent,
    RebateStudentComponent
  ],
  imports: [

    BrowserModule, // Import Angular modules here
    // Other modules if needed
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ZXingScannerModule,
    CommonModule,
    FormsModule,
    SharedMaterialComponentsModule,
    DbModuleModule,
    NgxSpinnerModule,
    BaseChartDirective,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2500 }),
    QRCodeModule
    // NavbarComponent
],
  providers: [
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()), 
    provideNativeDateAdapter(),
  ],    // Your services
  bootstrap: [AppComponent]  // Main component to bootstrap
})
export class AppModule { }
