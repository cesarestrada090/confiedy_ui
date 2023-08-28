import {Injectable} from "@angular/core";
import {ServiceConstants} from "../../constants/ServiceConstants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class CursosService {

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(){
    return this.httpClient.get(ServiceConstants.GET_CURSOS_PATH+'?alumnoId='+sessionStorage.getItem('alumnoId'));
  }

  public sendGetRequestPaginated(page: number, size: number){
    let queryParams = new HttpParams();
    queryParams.append("page",page);
    queryParams.append("size",size);
    return this.httpClient.get(ServiceConstants.GET_CURSOS_PATH,{params:queryParams});
  }

  public sendGetRequestById(id: number){
    return this.httpClient.get(ServiceConstants.GET_CURSOS_PATH + '/'+id);
  }
}
