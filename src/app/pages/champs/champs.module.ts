import { TimestampConverterPipe } from './../../common/pipes/timestamp-converter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampsRoutingModule } from './champs-routing.module';
import { ChampsComponent } from './champs.component';


@NgModule({
  declarations: [
    ChampsComponent,
    TimestampConverterPipe
  ],
  imports: [
    CommonModule,
    ChampsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ChampsModule { }
