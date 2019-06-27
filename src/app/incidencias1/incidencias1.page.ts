import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-incidencias1',
  templateUrl: './incidencias1.page.html',
  styleUrls: ['./incidencias1.page.scss'],
})
export class Incidencias1Page implements OnInit {
  texto: string;
  constructor(private config: ConfigService, private alertController: AlertController) { }

  ngOnInit() {
  }
  postIncidencia() {
    if (!this.texto) {
      this.config.presentAlert('Aviso', '', 'Sería bueno poner alguna explicación');
    } else {
      this.config.postIncidencia(this.texto);
    }
  }
}
