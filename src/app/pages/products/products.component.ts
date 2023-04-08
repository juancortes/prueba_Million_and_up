import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { DialogCantidadComponent } from '../dialogs/dialog-cantidad/dialog-cantidad.component';
import { ShoppingCard } from 'src/app/model/shopping-card';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumn: string[] = ['id','image','category','title','description','price'];
  @Output() valueAmount:EventEmitter<number> = new EventEmitter;
  image:string = "";
  title:string = "";
  description:string = "";
  category:string = "";
  price:string = "";
  cantidad:number = 0;
  rate:string = "";
  amount:number = 0;
  form! : FormGroup;
  shoppingCard = new ShoppingCard();
  cant:number = 0;

  constructor(private tableService: TableService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private fb:FormBuilder){
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      amount: [{value: '', disabled: false}, [Validators.required,Validators.min(1)]],

    });
  }

  ngOnInit() {
    this.calculateCount();
    setTimeout(() => {
      this.refreshProducts()
    }, 100);
    
  }

  refreshProducts()
  {
    let id:string = this.activatedRoute.snapshot.paramMap.get("id")|| "";
    this.tableService.getDataProductById(id).subscribe((data:any) => {     
      this.image = data['image'];
      this.title = data['title'];
      this.description = data['description'];
      this.category = data['category'];
      this.price    = data['price'];
      this.cantidad = data["count"] - this.cant;
      this.rate     = data["rate"];
    })
  }

  calculateCount() {
    this.cant = 0;
    let id:string = this.activatedRoute.snapshot.paramMap.get("id")|| "";
    this.tableService.getDataShoppingCardByProducts_id(id).subscribe((data:any) => {
      for (let dato of data) {
        this.cant += dato.sum;
        console.log
      }
    });
    return this.cant;
    
  }

  onChange( event:any) {
    if(event.target.value <= 0)
      event.target.value = 0;
    else{
      if(this.cantidad <= event.target.value)
      {
        event.target.value = 0;
        this.dialog.open(DialogCantidadComponent, {
          data: {
          },
        });
      }
      else{
        let products_id:number = parseInt((this.activatedRoute.snapshot.paramMap.get("id")|| "")) ;
        let count:number = event.target.value;
        let price:number = parseFloat(this.price);
        this.shoppingCard.products_id = products_id;
        this.shoppingCard.count = count;
        this.shoppingCard.price = price;
        this.tableService.saveShoppingCard(this.shoppingCard)
                        .subscribe(data => {
                          this.calculateCount();
                          setTimeout(() => {
                            this.refreshProducts()
                          }, 100);
                        })
      }
    }
  }

}
