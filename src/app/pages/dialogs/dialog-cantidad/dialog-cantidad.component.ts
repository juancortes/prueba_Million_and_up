import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cantidad',
  templateUrl: './dialog-cantidad.component.html',
  styleUrls: ['./dialog-cantidad.component.css']
})
export class DialogCantidadComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
