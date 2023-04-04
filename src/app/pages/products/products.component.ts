import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { DialogCantidadComponent } from '../dialogs/dialog-cantidad/dialog-cantidad.component';

export interface UserData {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: {
    count: BigInteger;
    rate: number;
  }
}

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

  constructor(private tableService: TableService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog){
    
  }

  ngOnInit() {
    let id:string = this.activatedRoute.snapshot.paramMap.get("id")|| "";
    this.tableService.getDataById(id).subscribe((data:any) => {     
      this.image = data['image'];
      this.title = data['title'];
      this.description = data['description'];
      this.category = data['category'];
      this.price    = "$"+data['price'];
      this.cantidad = data["rating"]["count"];
      this.rate     = data["rating"]["rate"];
    })
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
    }
  }

}
