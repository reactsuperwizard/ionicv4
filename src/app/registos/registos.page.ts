import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registos',
  templateUrl: './registos.page.html',
  styleUrls: ['./registos.page.scss'],
})
export class RegistosPage implements OnInit {
  geolists:any[];
  constructor(public config:ConfigService,
    private data:DataService,
    private loadingController:LoadingController) { 

    }

  ngOnInit() {
    this.loadInfos();
  }

  async loadInfos(){
    const loadingElement = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });

    await loadingElement.present();
    this.data.loadInfos().subscribe((data:any)=>{
      if(data){
        if(data.success==='1'){
          this.geolists=data.datalist;
          loadingElement.dismiss();
        }else{
          loadingElement.dismiss();
        }
      }else{
        loadingElement.dismiss();
      }
       
    },error=>{
      loadingElement.dismiss();
    });
  }

}
