import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditeurService } from '../editeur.service';
import { Editeur } from '../editeur';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private EditeursService: EditeurService) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  columns: string[] = ['maisonedit', 'siteweb', 'email', '_id'];
  displayProgressBar: boolean = false;

  editeurs: any;
  ngOnInit(): void {
    this.displayProgressBar = true;

    this.EditeursService.getAll().subscribe(
      (data: Editeur[]) => {
        this.editeurs = new MatTableDataSource<Editeur>(data);
        this.editeurs.paginator = this.paginator;
        this.editeurs.sort = this.sort;

        // Introduce a delay before hiding the progress bar
        setTimeout(() => {
          this.displayProgressBar = false;
        }); // Adjust the delay time as needed
      },
      (error) => {
        console.error('Error loading data', error);
        this.displayProgressBar = true;
      }
    );
  }

  deleteauteur(_id: object) {
    this.EditeursService.delete(_id).subscribe((res) => {
      console.log('Post deleted successfully!');
      const data = this.editeurs.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.editeurs = new MatTableDataSource<any>(data);
      this.editeurs.paginator = this.paginator;
      this.editeurs.sort = this.sort;
    });
  }
}
