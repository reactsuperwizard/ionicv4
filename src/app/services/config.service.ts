import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appconfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  loginState = new BehaviorSubject(false);
  numberValidState = new BehaviorSubject(false);

  loadData = {
    'myId': '',
    'myNum': '',
    'myName': '',
    'myGrpId': '',
    'myGrpName': '',
    'myGrpCheck': '',
    'myGrpAdminId': '',
    'myTip': '',
    'ngrupos': '',
    'myCode': '',
    'myGrpLat': '',
    'myGrpLon': '',
    'ultimo_F': '',
    'geo_phone':''
  };

  jornada = {
    'tipo_jornada': false,
    'completa': false,
    'parcial': false,
    'forma_jornada': false,
    'pactohoras': false,
    'flex': false,
    'descanso': false,
    'minutos': 0,
    'semanales': 0.0,
    'anuales': 0.0,
    'contrasenia': '',
    'horarios': ''
  };
  global_datos = {
    'Dats': ''
  };


  nuevo: number = 0;
  confHor: boolean = false;
  contrasenia: any;


  constructor(private storage: NativeStorage,
    private alertController: AlertController, private http: HttpClient) {

  }

  getMyInfo() {
    this.storage.getItem('myInfo').then(myInfo => {
      if (myInfo) {
        this.loadData = JSON.parse(myInfo);
      }
    });
  }

  setMyNum(numTel) {
    if (!numTel) {
      this.presentAlert('Aviso', '', 'Es imprescindible el N. de telefono correcto');
    } else {
      this.loadData.myNum = numTel;
      this.storage.setItem('myInfo', this.loadData);
      this.processSetNumber();
    }
  }

  processSetNumber() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let postData = {
      "myNum": this.loadData.myNum,
      "myName": this.loadData.myName
    }
    this.http.post(appconfig.post_phone_num_url, postData, { headers: headers }).subscribe((dataresult: any) => {
      console.log(dataresult);
      if (dataresult.success === '1') {
        if (dataresult.modo === 'nuevo') {
          this.presentAlert('Guardado', '', 'Número de telefono guardado, en breve recibirá un código por SMS para verificar su teléfono');
        }
      } else if (dataresult.modo === 'presente') { }
      this.nuevo = 1;
      this.loadData.myCode = '1';
      this.loadData.myId = dataresult.myId;
      this.loadData.myNum = dataresult.myNum;
      this.loadData.myName=dataresult.myName;
      this.storage.setItem('myInfo', this.loadData);
      this.numberValidState.next(true);
    });
  }

  checkCodeSMS(myCode) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let postData = {
      'myId': this.loadData.myId,
      'myNum': this.loadData.myNum,
      'myCode': myCode
    }
    this.http.post(appconfig.check_codesms, postData, { headers: headers }).subscribe((data: any) => {
      console.log(data);
      if (data.success === 1) {
        this.presentAlert('Guardado y verificado', '',
          'Ahora puede crear una empresa/seccion/grupo y despues añadir trabajadores al grupo  o, esperar ser añadido a un grupo. Gracias.');

        this.loadData.myCode = data.myCode;
        this.loadData.myId = data.myId;
        this.loadData.myName = data.myName;
        this.loadData.myGrpId = data.myGrpId;
        this.loadData.myGrpName = data.myGrpName;
        this.loadData.myGrpCheck = data.myGrpCheck;
        this.loadData.myGrpAdminId = data.myGrpAdminId;
        this.loadData.myTip = data.myTip;
        this.storage.setItem('myInfo', this.loadData);
        this.confHor = (this.loadData.myTip === 'U' ? true : false);
        this.jornada.forma_jornada = data.forma_jornada;
        this.jornada.pactohoras = (data.pactohoras === '1') ? true : false;
        this.jornada.flex = (data.flex === '1') ? true : false;
        this.jornada.descanso = (data.descanso === '1') ? true : false;
        this.jornada.minutos = data.minutos || 20;
        this.jornada.semanales = parseFloat(data.semanales);
        this.jornada.anuales = parseFloat(data.anuales);
        this.contrasenia = data.contrasenia;
        this.global_datos.Dats = this.loadData.myTip;
        this.loadData.myId = data.myId;
        this.loadData.myNum = data.myNum;
        this.loadData.myName = data.myName;
        this.loadData.myTip = 'A';
        this.storage.setItem('myInfo', this.loadData);
        this.storage.setItem('jornada', this.jornada);
        this.nuevo = 0;
        this.reloadConf();
        this.loginState.next(true);
      } else {
        this.presentAlert('Error de code SMS', '', 'El código SMS introducido es erroneo, intentelo de nuevo.');
        this.loadData.myCode = data.myCode || '';
        this.storage.setItem('myInfo', this.loadData);
      }
    });
  }


  reloadConf() {
    this.confHor = false;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let postData = {
      'myId': this.loadData.myId,
      'myGrpId': this.loadData.myGrpId,
      'crud': 'R'
    }

    this.http.post(appconfig.crud_phone_pref, postData, { headers: headers }).subscribe((data: any) => {
      console.log(data);
      if (data.success === '1') {
        this.jornada.tipo_jornada = data.tipo_jornada || '';
        this.jornada.forma_jornada = data.forma_jornada || '';
        this.jornada.pactohoras = (data.pactohoras === '1') ? true : false;
        this.jornada.flex = (data.flex === '1') ? true : false;
        this.jornada.descanso = (data.descanso === '1') ? true : false;
        this.jornada.minutos = parseInt(data.minutos) || 20;
        this.jornada.semanales = data.semanales || '';
        this.jornada.anuales = data.anuales || '';
        this.jornada.contrasenia = data.contrasenia || '';

        this.loadData.myNum = data.myNum || '';
        this.loadData.myName = data.myName || '';
        this.loadData.myTip = data.myTip || '';
        this.loadData.myGrpLat = data.myGrpLat || '';
        this.loadData.myGrpLon = data.myGrpLon || '';
        this.loadData.ultimo_F = data.ultimo_F || '';
        this.global_datos.Dats = data.horarios;

        this.jornada.horarios = this.global_datos.Dats;

        this.storage.setItem('myInfo', this.loadData);
        this.storage.setItem('jornada', this.jornada);
      }
    });

  }

  async presentAlert(headertitle, subtitle, messagealert) {
    const alert = await this.alertController.create({
      header: headertitle,
      subHeader: subtitle,
      message: messagealert,
      buttons: ['OK']
    });

    await alert.present();
  }
  updateLoadData(){
    this.storage.setItem('myInfo', this.loadData);
  }

}


