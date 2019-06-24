import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appconfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private config: ConfigService,private http:HttpClient) { }

getGrpList(){
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let postData = {
    'crud': 'R',
    'myId': this.config.loadData.myId
  }
  return this.http.post(appconfig.group_crud, postData, { headers: headers });   
}

getGrpCont(){
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let postData = {
    'grpId': this.config.loadData.myGrpId
  }
  return this.http.post(appconfig.get_trace_list, postData, { headers: headers });   
}

loadInfos(){
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let postData = {
    'id_numero':this.config.loadData.geo_phone,
    'id_grupo': this.config.loadData.myGrpId
  }
  return this.http.post(appconfig.get_trace_by_id, postData, { headers: headers });   

}


}
