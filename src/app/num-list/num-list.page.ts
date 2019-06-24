import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { DataService } from '../services/data.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-num-list',
  templateUrl: './num-list.page.html',
  styleUrls: ['./num-list.page.scss'],
})
export class NumListPage implements OnInit {

  geolists:any[];
  constructor(public config:ConfigService,
    private data:DataService,
    private loadingController:LoadingController,
    private nav:NavController) { }

  ngOnInit() {
    this.getGrpListData();
  }


  gotoDetail(id_phone){
    this.config.loadData.geo_phone=id_phone;
    this.config.updateLoadData();
    this.nav.navigateForward('/tabs/registos');
  }

 async getGrpListData(){
    const loadingElement = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });

    await loadingElement.present();
    this.data.getGrpCont().subscribe((data:any)=>{
      console.log(data);
      if(data){
        if ( data.success === '1'){
          this.geolists = data.datalist;
          loadingElement.dismiss();
          }else{
            loadingElement.dismiss();
          }
      }  
    },(error:any)=>{
      console.log(error);
      loadingElement.dismiss();
    });
  }

}
