import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url:'/' },
        {titulo: 'Sales', url:'sales' },
        {titulo: 'Shopping-cards', url:'shoping-cards' },
      ]
    }
  ];

  constructor() { }
}
