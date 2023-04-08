import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCard } from 'src/app/model/shopping-card';
import { TableService } from 'src/app/services/table.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-shopping-cards',
  templateUrl: './shopping-cards.component.html',
  styleUrls: ['./shopping-cards.component.css']
})
export class ShoppingCardsComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus
  faMinus = faMinus
  faAngleDown = faAngleDown
  shoppingCards1:any[] = [];

  constructor(private tableService: TableService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshShoppingCards();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  refreshShoppingCards()
  {
    this.tableService.getDataShoppingCards().subscribe((data:any) => {     
      this.shoppingCards1 = data;
      console.log(data)
    })
  }

  deleteShoppingCard(products_id:string) {
    this.tableService.deleteShoppingCard(products_id).subscribe((data:any) => {
      //console.log(data);
      this.refreshShoppingCards();
    })
  }
}
