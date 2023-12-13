import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditeurService } from '../editeur.service';
import { Editeur } from '../editeur';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(public editeurservice: EditeurService) {}

  ngOnInit(): void {}
  display = 'none';
  @ViewChild('myModal') myModal!: ElementRef;
  editeur: Editeur = new Editeur();
  create() {
    this.editeurservice.create(this.editeur).subscribe((data) => {
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
