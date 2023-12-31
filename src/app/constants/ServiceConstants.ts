import {NbGlobalPhysicalPosition} from "@nebular/theme";

export class ServiceConstants {

  //Server Constant
  public static get GET_API_HOST(){
    return 'http://ec2-3-90-70-80.compute-1.amazonaws.com';
    //return 'http://localhost';
  }

  public static get GET_PORT() : string {
    return ':8081';
  }

  public static get GET_ROOT_PATH() : string {
    return '/app';
  }
  public static get GET_API_PATH() : string {
    return this.GET_API_HOST + this.GET_PORT + this.GET_ROOT_PATH;
  }

  // Domain Paths
  public static get GET_TIPO_MODELO_PATH() : string {
    return this.GET_API_PATH + '/tipoModelo';
  }
  public static get GET_ESTADO_EQUIPO_PATH() : string {
    return this.GET_API_PATH + '/estadoEquipo';
  }

  public static get GET_CASO_TECNICO_PATH() : string {
    return this.GET_API_PATH + '/estadoCasoTecnico';
  }
  public static get GET_ESTADO_PROVEEDOR_PATH() : string {
    return this.GET_API_PATH + '/estadoProveedorServicio';
  }

  public static get GET_OPERADOR_PATH() : string {
    return this.GET_API_PATH + '/operador';
  }
  public static get GET_ESTADO_SEDE_PATH() : string {
    return this.GET_API_PATH + '/estadoSede';
  }
  public static get GET_ESTADO_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/estadoSuministro';
  }

  public static get GET_ESTADO_DETALLE_PATH() : string {
    return this.GET_API_PATH + '/estadoDetalleVisita';
  }

  public static get GET_ESTADO_VISITA_PATH() : string {
    return this.GET_API_PATH + '/estadoVisitaTecnica';
  }
  public static get GET_VISITA_TECNICA_PATH() : string {
    return this.GET_API_PATH + '/visitaTecnica';
  }

  public static get GET_CURSOS_PATH() : string {
    return this.GET_API_PATH + '/cursosPorAlumnoId';
  }
  public static get GET_DETALLE_VISITA_TECNICA_PATH() : string {
    return this.GET_API_PATH + '/detalleVisita';
  }
  public static get GET_DETALLE_CURSO_PATH() : string {
    return this.GET_API_PATH + '/evaluacionCurso/';
  }
  public static get GET_TIPO_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/tipoSuministro';
  }
  public static get GET_ESTADO_CONTRACTUAL_PATH() : string {
    return this.GET_API_PATH + '/estadoContractual';
  }
  public static get GET_UBICACION_EQUIPO_PATH() : string {
    return this.GET_API_PATH + '/ubicacionEquipo';
  }

  // CONFIGURATION

  public static get GET_AREA_PATH() : string {
    return this.GET_API_PATH + '/area';
  }
  public static get GET_USUARIO_LOGIN_PATH() : string {
    return this.GET_API_PATH + '/usuario/login';
  }
  public static get GET_USUARIO_BY_ID_PATH() : string {
    return this.GET_API_PATH + '/usuario/' + sessionStorage.getItem('userId');
  }

  public static get GET_USUARIO_PATH() : string {
    return this.GET_API_PATH + '/usuario/';
  }
  public static get GET_SEDE_PATH() : string {
    return this.GET_API_PATH + '/sede';
  }


  public static get GET_CONTRATO_PATH() : string {
    return this.GET_API_PATH + '/contrato';
  }

  public static get GET_UBICACION_PATH() : string {
    return this.GET_API_PATH + '/ubicacionSede';
  }

  public static get GET_PROVEEDOR_PATH() : string {
    return this.GET_API_PATH + '/proveedorServicio';
  }
  public static get GET_TECNICO_PATH() : string {
    return this.GET_API_PATH + '/tecnico';
  }
  public static get GET_CASO_PATH() : string {
    return this.GET_API_PATH + '/casoTecnico';
  }

  public static get GET_PERFIL_PATH() : string {
    return this.GET_API_PATH + '/perfil';
  }
  public static get GET_CLIENTE_PATH() : string {
    return this.GET_API_PATH + '/cliente';
  }
  public static get GET_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/suministro';
  }
  public static get GET_EQUIPO_PATH() : string {
    return this.GET_API_PATH + '/equipo';
  }
  public static get GET_MODELO_PATH() : string {
    return this.GET_API_PATH + '/modelo';
  }

  public static get GET_MODELO_SUMINISTRO_PATH() : string {
    return this.GET_API_PATH + '/modeloSuministro';
  }

  public static get GET_AREA_SEDE_PATH() : string {
    return this.GET_API_PATH + '/areaHasSede';
  }

  public static get GET_HARDWARE_PATH() : string {
    return this.GET_API_PATH + '/hardwareModelo';
  }
  public static get GET_DELETE_CONFIRM_MESSAGE() : string {
    return '¿Confirma que desea eliminar este registro?';
  }

  public static get GET_UPDATE_STATUS_CONFIRM_MESSAGE() : string {
    return '¿Confirma que cambiar el estado del registro?';
  }

  public static get GET_SAVE_CONFIRM_MESSAGE() : string {
    return '¿Confirma que desea grabar este registro?';
  }

  public static get GET_SAVE_NOTIFICATION_MESSAGE() : string {
    return 'Grabado Correctamente';
  }
  public static get GET_UPDATE_NOTIFICATION_MESSAGE() : string {
    return 'Actualizado Correctamente';
  }

  public static get SAVE_TOAST_CONFIG()  {
    return {
      status: 'success',
      duration: 3000,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true
    };
  };
}
