import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasosComponent } from './casos.component';
import {CasoComponent} from "./caso/caso.component";
import {CursosComponent} from "./cursos/cursos.component";

const routes: Routes = [
  {
    path: '',
    component: CasosComponent,
    children: [
      {
        path: 'caso',
        component: CasoComponent
      },
      {
        path: 'cursos',
        component: CursosComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasosRoutingModule {
}
