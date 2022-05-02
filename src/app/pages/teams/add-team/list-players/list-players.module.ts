import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPlayersRoutingModule } from './list-players-routing.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListPlayersRoutingModule,
    MatButtonModule
  ]
})
export class ListPlayersModule { }
