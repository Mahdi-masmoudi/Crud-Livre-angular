import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuteurService } from '../auteur.service';
import { Auteur } from '../auteur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(public auteurService: AuteurService, private router: Router) {}

  ngOnInit(): void {}
  display = 'none';
  @ViewChild('myModal') myModal!: ElementRef;
  auteur: Auteur = new Auteur();
  create() {
    this.auteurService.create(this.auteur).subscribe((data) => {
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
