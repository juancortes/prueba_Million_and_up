import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus, faTrash, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TableService } from 'src/app/services/table.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogCantidadComponent } from '../dialogs/dialog-cantidad/dialog-cantidad.component';
import { Router } from '@angular/router';
import { formatNumber } from '@angular/common';

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
  totalPay:number = 0;
  totalPayS:string = "";

  constructor(private tableService: TableService,
              public dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.refreshShoppingCards(0);
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
      this.refreshShoppingCards(0);
    });
  }

  refreshShoppingCards(val:number)
  {
    this.totalPay = 0;
    this.tableService.getDataShoppingCards().subscribe((data:any) => {
      console.log(val);
      if(val == 0)
      {
        this.shoppingCards1 = data;
      }
      data.forEach((dato:any) => {
        this.totalPay += dato.price * dato.sum;
        console.log("total_"+dato.products_id);
        setTimeout(() => {
          let el = document.getElementById("total_"+dato.products_id);
          if (el)
          {
            el.innerHTML = (dato.price * dato.sum) + "";
            console.log((dato.price * dato.sum) + "");
          }
        }, 500);
        
      });
    });
    setTimeout(() => {
      this.totalPayS = formatNumber(this.totalPay,'en-US');
    }, 500);
    
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
              dataKey: "insufficient amount"
            },
          });
          this.refreshShoppingCards(0);
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
        this.refreshShoppingCards(0);
      })
    }
  }

  addValue(value:string,products_id:string, price:number) {
    this.tableService.updateDataShoppingCards(value,products_id)
                      .subscribe((data:any) => {
                      });   
    
    this.refreshShoppingCards(1);
  }

  validateCount(value:number, products_id:string):number
  {
    this.tableService.getDataProductById(products_id).subscribe((data:any) => {
      this.count = data.count;
    })

    return this.count;
  }

  buy() {
    if(this.totalPay > 0)
    {
      this.tableService.saveSale().subscribe((data:any) => {
        this.dialog.open(DialogCantidadComponent, {
          data: {
            dataKey: "Products successfully purchased"
          },
        });
        this.refreshShoppingCards(0);
      })
    }
    else
    {
      this.dialog.open(DialogCantidadComponent, {
        data: {
          dataKey: "There aren't products to buy"
        },
      });
    }
  }

  followBuy() {
    this.router.navigate(['dashboard/sales'])
  }
}
