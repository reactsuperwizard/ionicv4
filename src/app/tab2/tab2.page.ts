import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ConfigService } from '../services/config.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  grpAList: any[];
  grpUList: any[];


  constructor(private data: DataService,
    private config: ConfigService,
    private nav: NavController,
    private loadingController: LoadingController) {
    this.initialize();
  }

  async initialize() {
    const loadingElement = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });

    await loadingElement.present();

    if (this.config.loadData.myTip === "U") {
      //goToRegistos
      console.log("go toregistos");
      loadingElement.dismiss()
    } else {
      //get group list data
      this.data.getGrpList().subscribe((data: any) => {
        console.log(data);
        if (data.success === 1) {
          this.grpAList = data.A;
          this.grpUList = data.U;
          loadingElement.dismiss();
        } else {
          loadingElement.dismiss();
        }
      });
    }
  }

  gotoGrpCont(myGrpId, myGrpName, myGrpAdminId){
    console.log(myGrpId+" "+myGrpName+" "+myGrpAdminId);
    this.config.loadData.myGrpId=myGrpId;
    this.config.loadData.myGrpName=myGrpName;
    this.config.loadData.myGrpAdminId=myGrpAdminId;

    if(this.config.loadData.myId===myGrpAdminId){
      this.config.loadData.myTip='A';
      this.config.updateLoadData();
      this.nav.navigateForward('/tabs/num-list');
      //goToNumList
    }else{
      this.config.loadData.myTip='U';
      this.config.loadData.geo_phone=this.config.loadData.myId;
      this.config.updateLoadData();
      this.nav.navigateForward('/tabs/registos');
      //goto registos
    }
    this.config.updateLoadData();

  }

  




}
