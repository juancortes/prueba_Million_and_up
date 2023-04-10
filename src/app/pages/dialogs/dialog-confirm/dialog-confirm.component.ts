import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent  {
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tableService: TableService) {}

  deleteShoppingCard(products_id:any) {
    this.tableService.deleteShoppingCard(products_id.dataKey + "").subscribe((data:any) => {
    })
  }
}
