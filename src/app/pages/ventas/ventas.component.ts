import { Component, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: [ './ventas.component.css'  ]
})
export class VentasComponent {
  title = 'data-table';
  displayedColumn: string[] = ['id','image','category','title','description','price'];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  posts:any;

  constructor(private tableService: TableService){
    this.tableService.getData().subscribe(data => {
      console.log(data);
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
