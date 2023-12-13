import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Specialite } from '../specialite';
import { SpecialiteService } from '../specialite.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(public specialiteService: SpecialiteService) {}

  ngOnInit(): void {}
  display = 'none';
  @ViewChild('myModal') myModal!: ElementRef;
  editeur: Specialite = new Specialite();
  create() {
    this.specialiteService.create(this.editeur).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  }
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
}
