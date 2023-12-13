import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SpecialiteService } from '../specialite.service';
import { Specialite } from '../specialite';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  specialite: any;
  constructor(private specialiteService: SpecialiteService) {}
  displayProgressBar: boolean = false;
  columns: string[] = ['nomspecialite', '_id'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngOnInit(): void {
    this.displayProgressBar = true;

    this.specialiteService.getAll().subscribe(
      (data: Specialite[]) => {
        this.specialite = new MatTableDataSource<Specialite>(data);
        this.specialite.paginator = this.paginator;
        this.specialite.sort = this.sort;

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
    this.specialiteService.delete(_id).subscribe((res) => {
      console.log('Post deleted successfully!');
      const data = this.specialite.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.specialite = new MatTableDataSource<any>(data);
      this.specialite.paginator = this.paginator;
      this.specialite.sort = this.sort;
    });
  }
}
