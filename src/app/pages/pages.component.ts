import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  courses: any;


  constructor() {

    this.courses =
      {
        title: 'Mis Cursos',
        icon: 'book-open-outline',
        link: '/pages/aula/cursos'
      };
    this.menu = this.menu.concat(this.courses);
    this.menu = this.menu.concat({
      title: 'Cerrar Sesión',
      icon: 'power-outline',
      link: '/autenticacion/login',
    })
  }
}
