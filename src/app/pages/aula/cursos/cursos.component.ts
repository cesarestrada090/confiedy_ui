import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {CasoService} from "../../../services/Caso/CasoService";
import {CursosService} from "../../../services/VisitaTecnica/cursos.service";
import {EstadoVisitaService} from "../../../services/EstadoVisita/EstadoVisitaService";
import {EstadoDetalleService} from "../../../services/EstadoDetalle/EstadoDetalleService";
import {TecnicoService} from "../../../services/TecnicoService/TecnicoService";
import {OperadorService} from "../../../services/Operador/OperadorService";
import {DetalleVisitaTecnicaService} from "../../../services/DetalleVisitaTecnica/DetalleVisitaTecnicaService";
import {Time} from "@angular/common";

@Component({
  selector: 'visita-tecnica-table',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent {
  idForm: string = '';

  selectedId: number;
  selectedDetailId: boolean = false;
  codigoCaso: string;

  fechaCreacion: Date;


  mantenedor: string = "Visitas Técnicas";
  responseListName: string = "visitaTecnicas";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;



  // Detalle form

  showDetalleForm: boolean = false;
  idDetalleForm: string = '';
  createDetailFormEnabled: boolean = false;
  comentario: string = '';
  fechaCreacionDetalle: Date;
  horaDetalle: Date;

  estadoDetalleVisitaCbo: any;

  estadoDetalleVisitaId:number;






  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true // set to false if no need for pagination
    },
    actions: {
      columnTitle: 'Ver Evaluaciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'}],
      position: 'right',
    },
    columns: {
      codigoCurso: {
        title: 'Código Curso',
        type: 'string',
        filter: false
      },
      nombreCurso: {
        title: 'Nombre Curso',
        type: 'string',
        filter: false
      },
      ciclo: {
        title: 'Ciclo',
        type: 'string',
        filter: false
      },
      nombreDocente: {
        title: 'Nombre Docente',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell: any, row: any) =>{
          return cell + ' '+row.apellidosDocente;
        }
      }
    },
  };

  detailSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true // set to false if no need for pagination
    },
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      visitaTecnicaId: {
        title: 'Código Visita Técnica',
        type: 'number',
        filter: false
      },
      nombreTecnico: {
        title: 'Nombre Técnico',
        type: 'string',
        filter: false
      },
      nombreOperador: {
        title: 'Nombre Operador',
        type: 'string',
        filter: false
      },
      fecha: {
        title: 'Fecha Creación',
        type: 'date',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          return parsedDate.toLocaleDateString('ES-en', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
      },
      hora: {
        title: 'Hora',
        type: 'string',
        filter: false,
        class: 'colDate',
        valuePrepareFunction: (cell: any, row: any) =>{
          let parsedDate = new Date(cell);
          const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
          const hour = String(parsedDate.getHours()).padStart(2, '0');
          return hour +':'+ minutes;
        }
      },
      estadoEstadoDetalleVisita: {
        title: 'Estado',
        type: 'date',
        filter: false
      },
      comentario: {
        title: 'Comentario',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  detalleSource: LocalDataSource = new LocalDataSource();

  constructor(private cursosService: CursosService,
              private detalleVisitaTecnicaService: DetalleVisitaTecnicaService,
              private estadoVisitaService : EstadoVisitaService,
              private estadoDetalleService : EstadoDetalleService,
              private tecnicoService : TecnicoService,
              private operadorService : OperadorService,
              private casoService : CasoService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.cursosService.sendGetRequest().subscribe((data: any) => {
      this.source = data;
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_DELETE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onViewVisitaTecnica(event): void {
    this.cleanDetalleForm();
    this.createDetailFormEnabled = false;
    this.selectedId = event.data.id;
    this.codigoCaso = event.data.codigoCasoTecnico;
    this.detalleSource = new ServerDataSource(this.httpClient,
      {
        endPoint: ServiceConstants.GET_DETALLE_VISITA_TECNICA_PATH + '/'+this.selectedId,
        dataKey: 'detalleVisitas',
        pagerPageKey: 'page',
        pagerLimitKey: 'size',
        totalKey: 'totalItems', //  total records returned in response path
      });

  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.fechaCreacion = event.data.fechaCreacion;
  }

  onSelectDetailRow(event): void {
    this.createDetailFormEnabled = true;
    this.selectedDetailId = true;
    this.idDetalleForm = event.data.id;
    this.estadoDetalleVisitaId = event.data.estadoId;
    this.comentario = event.data.comentario
    this.horaDetalle = new Date(event.data.hora);
    this.fechaCreacionDetalle = event.data.fecha;
  }

  onCreate(event): void {
    if (window.confirm(ServiceConstants.GET_SAVE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return this.idForm === '' ? 'Crear' : 'Actualizar';
  }

  getOperacionDetalle(): string {
    return this.idDetalleForm === '' ? 'Crear Detalle' : 'Actualizar Detalle';
  }

  shouldDisableSaveButton():boolean{
    return !this.fechaCreacion;
  }

  shouldDisableSaveDetailButton():boolean{
    return !this.estadoDetalleVisitaId || !this.fechaCreacionDetalle;
  }

  saveButton(){

  }

  saveDetalleButton(){

  }

  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
      console.log(error);
    };
  }

  cleanForm(){
    this.idForm = '';
    this.fechaCreacion = null;
    this.selectedId = null;
    this.idDetalleForm = '';
    this.selectedDetailId = null;
    this.cleanDetalleForm();
  }
  cleanDetalleForm(){
    this.idDetalleForm = '';
    this.estadoDetalleVisitaId = null;
    this.fechaCreacionDetalle = null;
    this.comentario = '';
  }

  activarDesactivarDetalleForm(){
    this.createDetailFormEnabled = !this.createDetailFormEnabled;
    this.idDetalleForm = '';
    this.estadoDetalleVisitaId = null;
    this.horaDetalle = null;
    this.fechaCreacionDetalle = null;
    this.comentario = '';
  }
}
