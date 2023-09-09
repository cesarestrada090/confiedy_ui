import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class PerfilService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_CASO_PATH);
  }
  public sendGetRequestById(){
    return this.httpClient.get(ServiceConstants.GET_USUARIO_BY_ID_PATH);
  }
  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_PERFIL_PATH,{params:queryParams});
  }

  public save(idForm : string,
              usuario : string,
              password : string,
              nombre : string,
              apellido : string,
              carrera : string,
              fechaNacimiento : Date){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_USUARIO_BY_ID_PATH,{
      'idUsuario': idForm,
      'usuario': usuario,
      'password': password,
      'nombreAlumno': nombre,
      'apellidoAlumno': apellido,
      'carrera': carrera,
      'fechaNacimiento': fechaNacimiento,
    },{ headers: headers});
  }
}
