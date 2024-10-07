import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './admin/scanner/scanner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMaterialComponentsModule } from './shared-material-components/shared-material-components.module';
import { DbModuleModule } from './db-module/db-module.module';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,  // Import Angular modules here
    // Other modules if needed
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ZXingScannerModule,
    CommonModule,
    FormsModule,
    SharedMaterialComponentsModule,
    DbModuleModule,
  ],
  providers: [
    provideHttpClient(),
  ],    // Your services
  bootstrap: [AppComponent]  // Main component to bootstrap
})
export class AppModule { }
