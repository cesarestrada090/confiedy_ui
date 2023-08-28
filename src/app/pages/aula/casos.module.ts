import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbOptionModule, NbSelectModule, NbTimepickerModule,
  NbTreeGridModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CasosRoutingModule } from './casos-routing.module';
import {FormsModule} from "@angular/forms";
import {TablesRoutingModule} from "../general/tables-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProveedorService} from "../../services/Proveedor/ProveedorService";
import {CasosComponent} from "./casos.component";
import {SuministroService} from "../../services/Suministro/SuministroService";
import {TipoSuministroService} from "../../services/TipoSuministro/TipoSuministroService";
import {EstadoSuministroService} from "../../services/EstadoSuministro/EstadoSuministroService";
import {TecnicoService} from "../../services/TecnicoService/TecnicoService";
import {CasoComponent} from "./caso/caso.component";
import {EstadoCasoTecnicoService} from "../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";
import {CasoService} from "../../services/Caso/CasoService";
import {EquipoService} from "../../services/Equipo/EquipoService";
import {CursosService} from "../../services/VisitaTecnica/cursos.service";
import {DetalleVisitaTecnicaService} from "../../services/DetalleVisitaTecnica/DetalleVisitaTecnicaService";
import {EstadoVisitaService} from "../../services/EstadoVisita/EstadoVisitaService";
import {CursosComponent} from "./cursos/cursos.component";
import {EstadoDetalleService} from "../../services/EstadoDetalle/EstadoDetalleService";
import {OperadorService} from "../../services/Operador/OperadorService";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    CasosRoutingModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    NbDatepickerModule,
    NbCardModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbOptionModule,
    NbSelectModule,
    NbTimepickerModule
  ],
  declarations: [
    CasosComponent,
    CasoComponent,
    CursosComponent
  ],
  providers: [
    ProveedorService,
    SuministroService,
    TipoSuministroService,
    EstadoSuministroService,
    EstadoCasoTecnicoService,
    CasoService,
    EquipoService,
    CursosService,
    EstadoVisitaService,
    DetalleVisitaTecnicaService,
    TecnicoService,
    EstadoDetalleService,
    OperadorService
  ]
})
export class CasosModule { }
