import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from '../authentification/auth.guard';

const routes: Routes = [
  {
    path: 'auteurs',
    redirectTo: 'auteurs/index',
    pathMatch: 'full',
  },
  {
    path: 'auteurs/index',
    component: IndexComponent,
    canActivate: [authGuard],
  },
  { path: 'auteurs/create', component: CreateComponent },
  { path: 'auteurs/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuteurRoutingModule {}
