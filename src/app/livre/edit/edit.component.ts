import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';
import { Auteur } from 'src/app/auteur/auteur';
import { Editeur } from 'src/app/editeur/editeur';
import { Specialite } from 'src/app/specialite/specialite';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { SpecialiteService } from 'src/app/specialite/specialite.service';
import { FilePondOptions } from 'filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  @Input() liverID: object;
  @ViewChild('myModal') myModal!: ElementRef;
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
    this.livserv.find(this.liverID).subscribe((data) => {
      this.livres = data;
    });
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
  updatelivre = () => {
    this.livserv.update(this.liverID, this.livres).subscribe((data) => {
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
  pondFiles: FilePondOptions['files'];
  updatePondFiles() {
    this.pondFiles = [
      {
        source: this.livres.couverture,
        options: {
          type: 'local',
        },
      },
    ];
  }

  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      load: (
        source: any,
        load: any,
        error: any,
        progress: any,
        abort: any,
        headers: any
      ) => {
        if (typeof source === 'string' && source !== '') {
          var myRequest = new Request(source);
          fetch(myRequest).then(function (response) {
            response.blob().then(function (myBlob) {
              load(myBlob);
            });
          });
        } else {
          error('Invalid URL');
        }
      },
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
            32;

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
