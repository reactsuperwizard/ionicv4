import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appconfig } from '../app.config';
import { DateFormatPipe } from '../date-format.pipe';
import { GeoService } from './geo.service';

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
    'geo_phone': '',
    'latF': '',
    'lonF': ''
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
    private alertController: AlertController,
    private http: HttpClient,
    private _dateFormater: DateFormatPipe,
    private nav: NavController, private geo: GeoService) {

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
      this.loadData.myName = dataresult.myName;
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
  updateLoadData() {
    this.storage.setItem('myInfo', this.loadData);
  }

  doPostGeo() {
    let currentDate = this._dateFormater.transform(new Date(), "yyyy-MM-dd");
    let mostrarDate = this._dateFormater.transform(new Date(), "dd-MM-yyyy");
    let currenttime = this._dateFormater.transform(new Date(), "HH-mm-ss");
    this.presenstConfirmationDoPostGeo(mostrarDate, currenttime);

  }

  async presenstConfirmationDoPostGeo(mostrarDate, currenttime) {
    const alert = await this.alertController.create({
      header: 'Preparado para iniciar la jornada?',
      message: 'Fecha: ' + mostrarDate + '<br/>Hora: ' + currenttime,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.presentAlert('Aviso', '', 'El fichado no se completó');
          }
        }, {
          text: '<b>Conforme</b>',
          handler: () => {
            console.log('Confirm Okay');
            this.postGeo('E');
            this.storage.setItem("datetimeF", new Date());
            this.nav.navigateForward('/tabs/start-cont');
          }
        }
      ]
    });
    await alert.present();
  }

  testDate() {
    console.log(this._dateFormater.transform(new Date(), "yyyy-MM-dd"));
    console.log(this._dateFormater.transform(new Date(), "HH-mm-ss"));
  }

  postGeo(tipo_F) {
    let currentdate = this._dateFormater.transform(new Date(), "yyyy-MM-dd");
    let mostrarDate = this._dateFormater.transform(new Date(), "dd-MM-yyyy");
    let currenttime = this._dateFormater.transform(new Date(), "HH-mm-ss");
    this.geo.getCuurentLocation().then((result) => {

      var datos_send = {
        date: currentdate,
        time: currenttime,
        lat: result.coords.latitude,
        lon: result.coords.longitude,
        phone: this.loadData.myNum,
        id_numero: this.loadData.myId,
        id_grupo: this.loadData.myGrpId,
        tipo_F: tipo_F //E-DS-DE-S
      };

      this.loadData.ultimo_F = tipo_F;
      this.updateLoadData();

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(appconfig.post_my_location, datos_send, { headers: headers }).subscribe((data: any) => {
        console.log(data);
        if (data[0].tipo_F == 'E') {
          this.storage.setItem('datetimeE', data[0].date + ' ' + data[0].time);
        }
        if (data[0].tipo_F == 'DS') {
          this.storage.setItem('datetimeDS', data[0].date + ' ' + data[0].time);
        }
        if (data[0].tipo_F == 'S') {

          this.storage.setItem('datetimeS', data[0].date + ' ' + data[0].time);
          this.storage.setItem('descanso', data[0].descanso);

        }
        if (data[0].tipo_F == 'DE') {
          this.storage.setItem('datetimeDE', data[0].date + ' ' + data[0].time);
        }
        try {
          if (data[0].success == '1') {

          } else {

          }
        } catch (err) {

          console.log(err.message);
        }
      });

    });

  }

  getIncidencia() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let postData = {
      'crud': 'R',
      'id_numero': this.loadData.myId,
      'id_grupo': this.loadData.myGrpId
    }

    return this.http.post(appconfig.crud_inci, postData, { headers: headers });
  }

  async setGeoValla() {
    const alert = await this.alertController.create({
      header: 'Establecer Punto de Fichaje:',
      message: 'Desde este punto y 5 metros alrededor se puede fichar',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel selected');

          }
        }, {
          text: 'Establecer',
          handler: () => {
            console.log('Confirm Okay');
            this.geo.getCuurentLocation().then((data) => {
              let headers = new HttpHeaders();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
              var datos_send = {
                lat: data.coords.latitude,
                lon: data.coords.longitude,
                id_grupo: this.loadData.myGrpId
              };
              return this.http.post(appconfig.set_geo_valla, datos_send, { headers: headers }).subscribe((result: any) => {
                try {
                  if (result[0].success == '1') {
                    this.presentAlert('Correcto', '', 'Punto establecido');
                    console.log(datos_send);
                  } else {
                    this.presentAlert('Fallo', '', 'Por alg\ún motivo no se ha fijado el punto,\<br/\>intentalo de nuevo');

                  }
                } catch (err) {

                  console.log(err.message);
                }
              });

            })

          }
        }
      ]
    });
    await alert.present();
  }

  addGrpInfo(grpName, grpCheck) {
    if (!grpName) {
      this.presentAlert('Aviso', '', 'Es imprescindible un nombre de grupo');
    } else {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let postData = {
        crud: "A",
        id_admin: this.loadData.myId,
        forma_check: grpCheck,
        nombre: grpName,
        lat: this.loadData.latF,
        lon: this.loadData.lonF
      }

      this.http.post(appconfig.group_crud, postData, { headers: headers }).subscribe((data: any) => {
        try {
          if (data[0].success === '1') {
            this.presentAlert('Grupo creado', '', 'Ya puedes añadir contactos a la empresa :)');
            this.loadData.myGrpId = data[0].grpId;
            this.loadData.myGrpName = grpName;
            this.loadData.myGrpCheck = grpCheck;
            this.updateLoadData();
            this.nav.navigateForward('/tabs/num-list');
          } else {//puede que ya esté guardado
            //no aceptado por error en la bd
          }
        } catch (err) {
          //error en la comunicacion
        }
      });


    }
  }

  async postIncidencia(textco) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let postData = {
      crud: "A",
      id_numero: this.loadData.myId,
      id_grupo: this.loadData.myGrpId,
      para: this.loadData.myGrpAdminId,
      texto: textco
    }
    this.http.post(appconfig.group_crud, postData, { headers: headers }).subscribe((data: any) => {
      try {
        if (data[0].success === '1') {
        this.presentIncendetia1();
        } else {//puede que ya esté guardado
          //no aceptado por error en la bd
        }
      } catch (err) {
        //error en la comunicacion
      }
    });


  }

  async presentIncendetia1(){
    const alert = await this.alertController.create({
      header: 'Incidencia',
      message: 'Está; la incidencia le llegará al responsable',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.postGeo('E');
            this.nav.navigateForward('/tabs/start');
          }
        }
      ]
    });
    await alert.present();
  }

}
