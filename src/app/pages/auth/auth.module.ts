import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {RouterOutlet} from "@angular/router";
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbButtonModule,
    RouterOutlet,
  ],
  declarations: [
    AuthComponent
  ],
})
export class AuthModule { }
