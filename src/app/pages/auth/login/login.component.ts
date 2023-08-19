import { Component } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  idForm: string = '';
  nombreEstado: string = '';
  mantenedor: string = "Estado Caso Técnico";
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
      nombre: {
        title: 'Estado',
        type: 'string',
        filter: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {

  }

  onDeleteConfirm(event): void {

  }

  onSelectRow(event): void {
    this.idForm = event.data.id;
    this.nombreEstado = event.data.nombre;
  }

  onCreate(event): void {

  }

  getOperacion(): string {
    return this.idForm === '' ? 'Crear' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.nombreEstado === '';
  }

  saveButton(){

  }
  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
    };
  }

  cleanForm(){
    this.idForm = '';
    this.nombreEstado = '';
  }
}
