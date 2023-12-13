import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuteurModule } from './auteur/auteur.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditeurModule } from './editeur/editeur.module';
import { LivreModule } from './livre/livre.module';
import { SpecialiteModule } from './specialite/specialite.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [AppComponent, DeleteModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuteurModule,
    EditeurModule,
    BrowserAnimationsModule,
    LivreModule,
    SpecialiteModule,
    AuthentificationModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
