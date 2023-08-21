import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {ThemeModule} from "../@theme/theme.module";
import {UsuarioService} from "../services/Usuario/UsuarioService";
import {AuthGuardService} from "../services/Auth/AuthGuardService";
@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers:[
    UsuarioService,
    AuthGuardService
  ]
})
export class AuthModule { }
