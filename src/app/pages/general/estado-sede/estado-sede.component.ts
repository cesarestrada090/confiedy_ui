import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {EstadoSedeService} from "../../../services/EstadoSede/EstadoSedeService";

@Component({
  selector: 'estado-sede-table',
  templateUrl: './estado-sede.component.html',
  styleUrls: ['./estado-sede.component.scss'],
})
export class EstadoSedeComponent {
  idForm: string = '';
  nombreEstado: string = '';
  mantenedor: string = "Estado Sede";
  responseListName: string = "estados";
  placeholder: string = 'Nombre ' + this.mantenedor;

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
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'left',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      estado: {
        title: 'Estado',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private estadoSedeService : EstadoSedeService,private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.estadoSedeService.sendGetRequest().subscribe((data: any[]) => {
      this.source = new ServerDataSource(this.httpClient,
        {
          endPoint: ServiceConstants.GET_ESTADO_SEDE_PATH, //full-url-for-endpoint without any query strings
          dataKey: this.responseListName,
          pagerPageKey: 'page',
          pagerLimitKey: 'size',
          totalKey: 'totalItems', //  total records returned in response path
        });
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_DELETE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.nombreEstado = event.data.estado;
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

  shouldDisableSaveButton():boolean{
    return this.nombreEstado === '';
  }

  saveButton(){
    if(this.idForm === ''){
      this.estadoSedeService.save(this.nombreEstado).subscribe((data: any[]) => {
        this.estadoSedeService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    } else {
      this.estadoSedeService.update(this.idForm , this.nombreEstado).subscribe((data: any[]) => {
        this.estadoSedeService.sendGetRequest().subscribe((data: any[]) => {
          this.source.load(data[this.responseListName]);
        })
      },this.manejarErrorSave());
    }
  }

  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
      console.log(error);
    };
  }

  cleanForm(){
    this.idForm = '';
    this.nombreEstado = '';
  }
}
