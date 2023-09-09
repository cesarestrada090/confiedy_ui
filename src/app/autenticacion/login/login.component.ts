import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UsuarioService} from "../../services/Usuario/UsuarioService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ngx-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  error: string;
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

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.loadInitialData();
    sessionStorage.removeItem('username');
  }

  private loadInitialData() {

  }

  onDeleteConfirm(event): void {

  }

  onSelectRow(event): void {
    this.username = event.data.id;
    this.password = event.data.nombre;
  }

  onCreate(event): void {

  }

  getOperacion(): string {
    return this.username === '' ? 'Crear' : 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return this.password === '';
  }

  loginToConfiedy(){
    if (this.username === '' || this.password === ''){
      this.error = 'El usuario y la contraseña son obligatorios';
      return;
    }
    this.usuarioService.login(this.username,this.password).subscribe((data: any) => {
      this.error = null;
      sessionStorage.setItem('alumnoId', data.alumnoId);
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('userId', data.id);
      sessionStorage.setItem('nombreCompleto', data.nombreAlumno + ' ' + data.apellidoAlumno);
      this.router.navigateByUrl('pages/general');
    },   err => {
      if (err.status === 404){
        this.error = 'Usuario y Contraseña Incorrectos';
        return;
      }
    });
  }
  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
    };
  }

  cleanForm(){
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {

  }
}
