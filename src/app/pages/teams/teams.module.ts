import { MatIconModule } from '@angular/material/icon';
import { ErrorPipe } from './../../common/pipes/error-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListPlayersComponent } from './add-team/list-players/list-players.component';
import { AddTeamFormComponent } from './add-team/add-team-form/add-team-form.component';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    TeamsComponent,
    AddTeamComponent,
    ListPlayersComponent,
    AddTeamFormComponent,
    ErrorPipe
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class TeamsModule { }
