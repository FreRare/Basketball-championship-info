import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlayersComponent } from './list-players.component';

const routes: Routes = [
  {path: '', component: ListPlayersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPlayersRoutingModule { }
