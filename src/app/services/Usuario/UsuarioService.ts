import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class UsuarioService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_USUARIO_LOGIN_PATH);
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_USUARIO_LOGIN_PATH,{params:queryParams});
  }

  public login(username : string, password : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(ServiceConstants.GET_USUARIO_LOGIN_PATH,
      { 'username': username, 'password': password},{ headers: headers});
  }

  public isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  public update(id : string , nombre : string, ceco : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(ServiceConstants.GET_USUARIO_LOGIN_PATH+'/'+id,{ 'id': id,'nombre': nombre, 'ceco': ceco },{ headers: headers});
  }
}
