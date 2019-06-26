import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.page.html',
  styleUrls: ['./lista-incidencias.page.scss'],
})
export class ListaIncidenciasPage implements OnInit {
  incidencias:any[];
  alertas:any[];
  constructor(public config:ConfigService) { }

  ngOnInit() {
    this.getIncidencia();
  }

  getIncidencia(){
    console.log("calling getIncidencia");
this.config.getIncidencia().subscribe((data:any)=>{
  console.log(data);
  if(data){
    if(data.success==='1'){
      this.incidencias=data.datalist;
      this.alertas=data.data_in;
    }
  }
      
});
  }

  openModal(id_numero){

  }


}
