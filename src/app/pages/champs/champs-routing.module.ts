import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampsComponent } from './champs.component';

const routes: Routes = [
  {path:'', component: ChampsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampsRoutingModule { }
