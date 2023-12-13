import { Component, OnInit, ViewChild } from '@angular/core';
import { Auteur } from '../auteur';
import { AuteurService } from '../auteur.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  columns: string[] = ['nomauteur', 'email', 'numtel', '_id'];
  auteurs: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private AuteurService: AuteurService) {}
  displayProgressBar = false;

  ngOnInit(): void {
    this.displayProgressBar = true;
    this.AuteurService.getAll().subscribe(
      (data: Auteur[]) => {
        this.auteurs = new MatTableDataSource<any>(data);
        this.auteurs.paginator = this.paginator;
        this.auteurs.sort = this.sort;
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
  deleteauteur(_id: object) {
    this.AuteurService.delete(_id).subscribe((res) => {
      console.log('Post deleted successfully!');
      const data = this.auteurs.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.auteurs = new MatTableDataSource<any>(data);
      this.auteurs.paginator = this.paginator;
      this.auteurs.sort = this.sort;
    });
  }
}
