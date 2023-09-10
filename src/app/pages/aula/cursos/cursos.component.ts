import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {PerfilService} from "../../../services/Caso/PerfilService";
import {CursosService} from "../../../services/VisitaTecnica/cursos.service";
import {EstadoVisitaService} from "../../../services/EstadoVisita/EstadoVisitaService";
import {EstadoDetalleService} from "../../../services/EstadoDetalle/EstadoDetalleService";
import {TecnicoService} from "../../../services/TecnicoService/TecnicoService";
import {OperadorService} from "../../../services/Operador/OperadorService";
import {DetalleVisitaTecnicaService} from "../../../services/DetalleVisitaTecnica/DetalleVisitaTecnicaService";

@Component({
  selector: 'visita-tecnica-table',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent {
  idForm: string = '';

  selectedCourseId: number;
  codigoCursoSeleccionado: number;
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
      universidad: {
        title: 'Universidad',
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
      numero_unidad: {
        title: 'Número de Evaluación',
        type: 'number',
        filter: false
      },
      horario: {
        title: 'Horario',
        type: 'string',
        filter: false
      },
      linkClase: {
        title: 'Link de la clase',
        type: 'string',
        filter: false
      },
      linkMaterial: {
        title: 'Link del Material',
        type: 'date',
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
              private casoService : PerfilService,
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
  onViewCurso(event): void {
    this.cleanDetalleForm();
    this.selectedCourseId = event.data.id;
    this.codigoCursoSeleccionado = event.data.nombreCurso;
    this.detalleSource = new ServerDataSource(this.httpClient,
      {
        endPoint: ServiceConstants.GET_DETALLE_CURSO_PATH + this.selectedCourseId + '/' +  sessionStorage.getItem('alumnoId'),
        dataKey: '',
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
    this.selectedCourseId = null;
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
