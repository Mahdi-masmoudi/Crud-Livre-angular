import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Editeur } from '../editeur';
import { EditeurService } from '../editeur.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() editeurId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  editeur: Editeur = new Editeur();
  constructor(private Editeurservice: EditeurService) {}
  ngOnInit(): void {
    this.Editeurservice.find(this.editeurId).subscribe((data) => {
      this.editeur = data;
    });
  }
  updateediteur = () => {
    this.Editeurservice.update(this.editeurId, this.editeur).subscribe(
      (data) => {
        console.log(data);
        this.closeModal();
        window.location.reload();
      }
    );
  };
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
}
