import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './common/services/user.guard';

const routes: Routes = [
  {
    path: 'teams',
    loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [UserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    //canActivate: [!UserGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'champs',
    loadChildren: () => import('./pages/champs/champs.module').then(m => m.ChampsModule)
  },
  { path: 'not-found',
   loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '',
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: "/not-found",
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
