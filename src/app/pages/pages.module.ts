import { NgModule } from '@angular/core';
import {NbMenuModule, NbTimepickerModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {UsuarioService} from "../services/Usuario/UsuarioService";
import {AuthGuardService} from "../services/Auth/AuthGuardService";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [UsuarioService,AuthGuardService]
})
export class PagesModule {
}
