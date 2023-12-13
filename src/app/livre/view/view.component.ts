import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LivreService } from '../livre.service';
import { Livre } from '../livre';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { Editeur } from 'src/app/editeur/editeur';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { Auteur } from 'src/app/auteur/auteur';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @Input() liverId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  auteurs!: Auteur[];
  editeur!: Editeur[];
  livres: Livre = new Livre();
  constructor(
    private liverService: LivreService,
    private scatserv: AuteurService,
    private editeurService: EditeurService
  ) {}

  ngOnInit() {
    this.loadscategorie();
    this.loadMaison();

    this.liverService.find(this.liverId).subscribe((data) => {
      this.livres = data;
    });
  }

  loadscategorie() {
    return (
      this.scatserv.getAll().subscribe((data) => (this.auteurs = data)),
      (error: any) => console.log(error)
    );
  }
  loadMaison() {
    return (
      this.editeurService.getAll().subscribe((data) => (this.auteurs = data)),
      (error: any) => console.log(error)
    );
  }
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
}
