import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Livre } from '../livre';
import { Specialite } from 'src/app/specialite/specialite';
import { Auteur } from 'src/app/auteur/auteur';
import { Editeur } from 'src/app/editeur/editeur';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { SpecialiteService } from 'src/app/specialite/specialite.service';
import { LivreService } from '../livre.service';
import { FilePondComponent } from 'ngx-filepond/lib/ngx-filepond.component';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  display = 'none';
  livres: Livre = new Livre();
  auteurs!: Auteur[];
  editeurs!: Editeur[];
  specialite!: Specialite[];
  constructor(
    private livserv: LivreService,
    private autserv: AuteurService,
    private editserv: EditeurService,
    private specserv: SpecialiteService
  ) {}
  ngOnInit(): void {
    this.loadauteurs();
    this.loadediteurs();
    this.loadspecialite();
  }
  loadediteurs() {
    return (
      this.editserv.getAll().subscribe((data) => (this.editeurs = data)),
      (error: any) => console.log(error)
    );
  }
  loadspecialite() {
    return (
      this.specserv.getAll().subscribe((data) => (this.specialite = data)),
      (error: any) => console.log(error)
    );
  }
  loadauteurs() {
    return (
      this.autserv.getAll().subscribe((data) => (this.auteurs = data)),
      (error: any) => console.log(error)
    );
  }
  ajoutlivre = () => {
    this.livserv.create(this.livres).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (
        fieldName: any,
        file: any,
        metadata: any,
        load: any,
        error: any,
        progress: any,
        abort: any
      ) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Bib_cloudinary');
        data.append('cloud_name', 'bib-iset');
        data.append('public_id', file.name);
        this.livserv.uploadSignature(data).subscribe({
          next: (res) => {
            this.livres.couverture = res.url;
            load(res);
          },
          error: (e) => {
            console.log(e);
            error(e);
            return () => {
              abort();
            };
          },
          complete: () => {
            console.log('done');
            return () => {
              abort();
            };
          },
        });
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();
      },
    },
  };
}
