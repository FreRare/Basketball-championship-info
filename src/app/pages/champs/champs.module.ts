import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampsRoutingModule } from './champs-routing.module';
import { ChampsComponent } from './champs.component';


@NgModule({
  declarations: [
    ChampsComponent,
  ],
  imports: [
    CommonModule,
    ChampsRoutingModule
  ]
})
export class ChampsModule { }
