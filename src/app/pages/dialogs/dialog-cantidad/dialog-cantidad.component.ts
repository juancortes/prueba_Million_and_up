import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-dialog-cantidad',
  templateUrl: './dialog-cantidad.component.html',
  styleUrls: ['./dialog-cantidad.component.css']
})
export class DialogCantidadComponent {
}
