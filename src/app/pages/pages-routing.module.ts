import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {AuthGuardService} from "../services/Auth/AuthGuardService";
import {UsuarioService} from "../services/Usuario/UsuarioService";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'general',
      canActivate:[AuthGuardService],
      loadChildren: () => import('./general/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'configuracion',
      loadChildren: () => import('./configuracion/configuracion.module')
        .then(m => m.ConfiguracionModule),
    },
    {
      path: 'equipos',
      loadChildren: () => import('./equipos/equipos.module')
        .then(m => m.EquiposModule),
    },
    {
      path: 'aula',
      loadChildren: () => import('./aula/casos.module')
        .then(m => m.CasosModule),
    },
    {
      path: '',
      redirectTo: 'general',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[UsuarioService]
})
export class PagesRoutingModule {
}
