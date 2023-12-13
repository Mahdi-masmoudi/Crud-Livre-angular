import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Specialite } from '../specialite';
import { SpecialiteService } from '../specialite.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() SpecId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  specialite: Specialite = new Specialite();
  constructor(private specialiteService: SpecialiteService) {}
  ngOnInit(): void {
    this.specialiteService.find(this.SpecId).subscribe((data) => {
      this.specialite = data;
    });
  }
  updatesep = () => {
    this.specialiteService
      .update(this.SpecId, this.specialite)
      .subscribe((data) => {
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
