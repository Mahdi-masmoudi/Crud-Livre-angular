import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Auteur } from '../auteur';
import { AuteurService } from '../auteur.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() auteurId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  auteurs: Auteur = new Auteur();
  constructor(private auteurService: AuteurService) {}
  ngOnInit(): void {
    this.auteurService.getAuteurByID(this.auteurId).subscribe((data) => {
      this.auteurs = data;
    });
  }
  updateauteur = () => {
    this.auteurService.update(this.auteurId, this.auteurs).subscribe((data) => {
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
}
