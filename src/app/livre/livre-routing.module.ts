import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from '../authentification/auth.guard';

const routes: Routes = [
  { path: 'Livres', redirectTo: 'Livres/index', pathMatch: 'full' },
  { path: 'Livres/index', component: IndexComponent, canActivate: [authGuard] },
  { path: 'Livres/create', component: CreateComponent },
  { path: 'Livres/edit', component: EditComponent },
  { path: 'Livres/:liverId/view', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivreRoutingModule {}
