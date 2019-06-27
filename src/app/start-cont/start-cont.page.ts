import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { DateFormatPipe } from '../date-format.pipe';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-start-cont',
  templateUrl: './start-cont.page.html',
  styleUrls: ['./start-cont.page.scss'],
})
export class StartContPage implements OnInit {
  startTimmer: boolean = false;
  clock:string;
  clockday:string;

  boton_descanso:string="Realizar un descanso";
  estado_F:string;

  constructor(public config:ConfigService,
    private dateFormater:DateFormatPipe,
    private nav:NavController,
    private alertController:AlertController) {

     }

  ngOnInit() {
    this.startTimmer=true;
    this.timeManager()
    this.init();
  }

  init(){
    if(this.config.loadData.ultimo_F==='E'){
      this.estado_F = "Estas en tu jornada laboral";
      this.boton_descanso = "Realizar un descanso";
    }
    else if(this.config.loadData.ultimo_F==='DS'){
      this.estado_F = "Estas en tu tiempo de descanso";
      this.boton_descanso = "Terminar el descanso";
    }
    else if(this.config.loadData.ultimo_F==='DE'){
      this.estado_F = "Estas en tu jornada laboral";
      this.boton_descanso = "Realizar un nuevo descanso";
    }
   else if(this.config.loadData.ultimo_F==='S'){
    this.nav.navigateBack('/tabs/start');
    }
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
    this.clock=this.dateFormater.transform(new Date(),"dd:MM:yyyy")
    this.clockday=this.dateFormater.transform(new Date(),"HH:mm:ss")
  }

 async popDescanso(){
    console.log("1 = "+this.config.loadData.ultimo_F);
    if(this.config.loadData.ultimo_F==='E' ||
    this.config.loadData.ultimo_F==='S'){
      const alert = await this.alertController.create({
      header: 'Descanso',
      message: 'Descanso, conforme a lo establecido',
      buttons: [
        {
          text: 'OK',
          handler: () => {
           this.config.postGeo('D§§S');
           this.config.loadData.ultimo_F='DS';
           this.config.updateLoadData();
           this.init();
         }
        }
      ]
    });
      await alert.present();
    }else if(this.config.loadData.ultimo_F==='DS'){
      this.config.postGeo('DE');
      this.config.loadData.ultimo_F='DE';
      this.config.updateLoadData();
      this.init();
    }else if(this.config.loadData.ultimo_F==='DE'){
      const alert = await this.alertController.create({
        header: 'Descanso',
        message: 'Descanso, conforme a lo establecido',
        buttons: [
          {
            text: 'OK',
            handler: () => {
             this.config.postGeo('DS');
              this.init();
           }
          }
        ]
      });
        await alert.present();
    }
  }

  popFinalizar(){
    this.config.postGeo('S');
    this.nav.navigateForward('/tabs/end-jornada');
    //
  }
  showInci(){
    this.nav.navigateForward('/tabs/lista-incidencias');
  }

}
