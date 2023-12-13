import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from '../authentification/auth.guard';

const routes: Routes = [
  { path: 'editeurs', redirectTo: 'editeurs/index', pathMatch: 'full' },
  {
    path: 'editeurs/index',
    component: IndexComponent,
    canActivate: [authGuard],
  },
  { path: 'editeurs/create', component: CreateComponent },
  //{ path: 'editeurs/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditeurRoutingModule {}
