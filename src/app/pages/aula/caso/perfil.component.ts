import { Component } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import {HttpClient,} from "@angular/common/http";
import {ServiceConstants} from "../../../constants/ServiceConstants";
import {NbToastrService} from "@nebular/theme";
import {PerfilService} from "../../../services/Caso/PerfilService";
import {EstadoCasoTecnicoService} from "../../../services/EstadoCasoTecnico/EstadoCasoTecnicoService";
import {EquipoService} from "../../../services/Equipo/EquipoService";

@Component({
  selector: 'perfil-table',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  idForm: string = '';
  usuario: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  carrera: string = '';
  fechaNacimiento: Date;

  mantenedor: string = "Mi Perfil";
  responseListName: string = "perfil";
  errorMsg: string = '';
  placeholder: string = 'Nombre ' + this.mantenedor;

  source: LocalDataSource = new LocalDataSource();

  constructor(private perfilService: PerfilService,
              private httpClient: HttpClient,
              private notificacionService: NbToastrService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.perfilService.sendGetRequestById().subscribe((data: any) => {
      this.idForm = data.id;
      this.usuario = data.username;
      this.password = data.password;
      this.nombre = data.nombreAlumno;
      this.apellido = data.apellidoAlumno;
      this.carrera = data.carrera;
      this.fechaNacimiento = data.fechaNacimiento;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm(ServiceConstants.GET_DELETE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSelectRow(event): void {
    this.idForm = event.data.usuarioId;
    this.usuario = event.data.usuario;
    this.nombre = event.data.nombre;
    this.apellido = event.data.apellido;
    this.carrera = event.data.carrera;
    this.fechaNacimiento = event.data.fechaNacimiento;
  }

  onCreate(event): void {
    if (window.confirm(ServiceConstants.GET_SAVE_CONFIRM_MESSAGE)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getOperacion(): string {
    return 'Actualizar';
  }

  shouldDisableSaveButton():boolean{
    return false;
  }

  saveButton(){
    this.perfilService.save(this.idForm,
      this.usuario,
      this.password,
      this.nombre,
      this.apellido,
      this.carrera,
      this.fechaNacimiento).subscribe((data: any[]) => {
        this.mostrarNotificacionGrabado();
      },this.manejarErrorSave());
  }

  private manejarErrorSave() {
    return error => {
      window.alert(this.mantenedor + ' repetido, Ingrese otros valores') ;
      console.log(error);
    };
  }

  private mostrarNotificacionGrabado() {
    this.notificacionService.show(
      '',
      ServiceConstants.GET_UPDATE_NOTIFICATION_MESSAGE,
      ServiceConstants.SAVE_TOAST_CONFIG);
  }
}
