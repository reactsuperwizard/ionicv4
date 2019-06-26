import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-configure-hotel',
  templateUrl: './configure-hotel.page.html',
  styleUrls: ['./configure-hotel.page.scss'],
})
export class ConfigureHotelPage implements OnInit {

  myGrpName:string;
  myGrpCheck:string;
  constructor(public config:ConfigService) { }

  ngOnInit() {
    this.myGrpName=this.config.loadData.myGrpName;
    this.myGrpCheck=this.config.loadData.myGrpCheck;
  }

  setGeoValla(){

  }
setMygrpChek(value){
  this.myGrpCheck=value;
}
}
