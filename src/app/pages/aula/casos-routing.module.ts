import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasosComponent } from './casos.component';
import {PerfilComponent} from "./caso/perfil.component";
import {CursosComponent} from "./cursos/cursos.component";

const routes: Routes = [
  {
    path: '',
    component: CasosComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent
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
