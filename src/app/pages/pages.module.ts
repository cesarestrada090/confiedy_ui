import { NgModule } from '@angular/core';
import {NbMenuModule, NbTimepickerModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ConfiguracionModule,
    AuthModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
