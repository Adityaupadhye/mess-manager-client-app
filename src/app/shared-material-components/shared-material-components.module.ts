import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatSnackBar
  ]
})
export class SharedMaterialComponentsModule { }
