import { Component, OnInit, ViewChild } from '@angular/core';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { Auteur } from 'src/app/auteur/auteur';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { Editeur } from 'src/app/editeur/editeur';
import { SpecialiteService } from 'src/app/specialite/specialite.service';
import { Specialite } from 'src/app/specialite/specialite';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  columns: string[] = [
    'couverture',
    'titre',
    'annedition',
    'auteursId',
    'maisedId',
    'specialiteId',
    '_id',
  ];
  livres: any;
  auteurs!: Auteur[];
  maised!: Editeur[];
  specialites!: Specialite[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private livreService: LivreService,
    private auteurServ: AuteurService,
    private editeurServ: EditeurService,
    private specServ: SpecialiteService,
    private dialog: MatDialog // Ajoutez le service MatDialog
  ) {}
  deleteModal: any;
  idTodelete: number = 0;
  displayProgressBar = false;

  ngOnInit(): void {
    this.loadMaison();
    this.loadscategorie();
    this.displayProgressBar = true;
    this.livreService.getAll().subscribe(
      (data: Livre[]) => {
        this.livres = new MatTableDataSource<Livre>(data);
        this.livres.paginator = this.paginator;
        this.livres.sort = this.sort;
        setTimeout(() => {
          this.displayProgressBar = false;
        });
      },
      (error) => {
        console.error('Error loading data', error);
        this.displayProgressBar = true;
      }
    );
  }

  loadMaison() {
    return (
      this.editeurServ.getAll().subscribe((data) => (this.maised = data)),
      (error: any) => console.log(error)
    );
  }

  loadscategorie() {
    return (
      this.auteurServ.getAll().subscribe((data) => (this.auteurs = data)),
      (error: any) => console.log(error)
    );
  }
  loadspec() {
    return (
      this.specServ.getAll().subscribe((data) => (this.specialites = data)),
      (error: any) => console.log(error)
    );
  }
  deleteauteur(_id: object) {
    this.livreService.delete(_id).subscribe((res) => {
      console.log('Post deleted successfully!');
      const data = this.livres.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.livres = new MatTableDataSource<any>(data);
      this.livres.paginator = this.paginator;
      this.livres.sort = this.sort;
    });
  }
  openDeleteModal(_id: object) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        _id: _id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteauteur(_id);
      }
    });
  }
}
