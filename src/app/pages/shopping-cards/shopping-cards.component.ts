import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus, faTrash, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TableService } from 'src/app/services/table.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogCantidadComponent } from '../dialogs/dialog-cantidad/dialog-cantidad.component';

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
  total:number = 0;
  count:number = 0;

  constructor(private tableService: TableService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshShoppingCards();
  }

  openDialogConfirm(enterAnimationDuration: string, exitAnimationDuration: string, products_id: string): void {
    this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dataKey: products_id
      }
    }).afterClosed().subscribe(() =>{
      this.refreshShoppingCards();
    });
  }

  refreshShoppingCards()
  {
    this.tableService.getDataShoppingCards().subscribe((data:any) => {     
      this.shoppingCards1 = data;
    })
  }

  onCountChange(value:Event,products_id:string, price:number){
    if(parseInt((value.target as HTMLInputElement).value) > 0)
    {
      this.validateCount(parseInt((value.target as HTMLInputElement).value), products_id);
      setTimeout(() => {
        if(parseInt((value.target as HTMLInputElement).value) > this.count )
        {
          this.dialog.open(DialogCantidadComponent, {
            data: {
            },
          });
          this.refreshShoppingCards();
        }
        else
        {
          this.addValue((value.target as HTMLInputElement).value, products_id, price);
        }
      }, 500);
    }
    else
    {
      this.tableService.deleteShoppingCard(products_id).subscribe((data:any) => {
        this.refreshShoppingCards();
      })
    }
  }

  addValue(value:string,products_id:string, price:number) {
    this.tableService.updateDataShoppingCards(value,products_id)
                      .subscribe((data:any) => {
                      });
      this.total = parseInt(value) * price;

      const el = document.getElementById("total_"+products_id);
      if (el)
        el.innerHTML = this.total + "";
  }

  validateCount(value:number, products_id:string):number
  {
    this.tableService.getDataProductById(products_id).subscribe((data:any) => {
      this.count = data.count;
    })

    return this.count;
  }

  buy() {
    this.tableService.saveSale().subscribe((data:any) => {
    })
  }
}
