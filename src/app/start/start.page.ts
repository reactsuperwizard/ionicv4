import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { NavController, AlertController } from '@ionic/angular';
import { GeoService } from '../services/geo.service';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  currentday: string;
  currentmonth: string;
  currentyear: string;
  currentHrs: string;
  currentMins: string;
  currentseconds: string;
  startTimmer: boolean = false;
  clock:string;
  clockday:string;

  estado_F:string = "Empezar la jornada";
  constructor(public config:ConfigService,
    private nav:NavController,
    private geo: GeoService,
    private alertController:AlertController,private dateFormater:DateFormatPipe
    ) { }

  ngOnInit() {
    
    this.startTimmer=true;
    this.timeManager();
   // this.nav.navigateForward('/tabs/start-cont');
  }

  async timeManager() {
    while (this.startTimmer) {
      this.updateClock();
      await this.delay(1000);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateClock(){
  
    this.clock=this.dateFormater.transform(new Date(),"HH:mm:ss");
    this.clockday=this.dateFormater.transform(new Date(),"dd:MM:yyyy");
  }

  lanzarF(){
    if(this.config.loadData.myGrpId){
      console.log("calling checkTipoConf");
      this.checkTipoConf();  
    }else if(!this.config.loadData.myGrpId){
      this.config.presentAlert('No puede fichar!','','No pertenece a ninguna empresa');
      console.log('No tiene empresa');
    }else{

    }
  }

  goToLists(){
    this.nav.navigateForward('/tabs/tab2');
  }

  showInci(){
    this.nav.navigateForward('/tabs/lista-incidencias');
  }

  async checkTipoConf(){
    let dist = 0;
    if(this.config.loadData.myGrpCheck==='A'||this.config.loadData.myGrpCheck==='C'){
        //call doPostGeo()
        this.config.doPostGeo();
    }else if(this.config.loadData.myGrpCheck==='G'){
      this.geo.getCuurentLocation().then((result:any)=>{
      this.config.loadData.latF=result.coords.latitude;
      this.config.loadData.lonF=result.coords.longitude;
      dist = this.geo.getDistanceFromLatLonInKm(this.config.loadData.myGrpLat, this.config.loadData.myGrpLon
      , result.coords.latitude, result.coords.longitude);
      if (dist < 25) {
        this.config.doPostGeo();
    } else {
        var txt_dist = dist + " metros";
        if (dist > 1000) { txt_dist = Math.round(dist / 1000) + " kilometros"; }
        this.presenstConfirmation(txt_dist);
    }

      }).catch((error)=>{
        console.log('Error getting location', error);
      });
   

    }
  }


  async presenstConfirmation(txt_dist){
    const alert = await this.alertController.create({
      header: 'Zona de fichaje',
      message: 'No está en su lugar de fichaje. Se encuentra a ' + txt_dist + ' de su lugar de fichado. Acepta el fichaje?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '<b>Si</b>',
          handler: () => {
            console.log('Confirm Okay');
            this.config.doPostGeo();
          }
        }
      ]
    });
    await alert.present();
  }


}
