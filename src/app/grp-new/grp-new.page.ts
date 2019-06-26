import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-grp-new',
  templateUrl: './grp-new.page.html',
  styleUrls: ['./grp-new.page.scss'],
})
export class GrpNewPage implements OnInit {
  myGrpName:string;
  myGrpCheck:string;
  constructor(public config:ConfigService) {
    this.myGrpName=config.loadData.myGrpName;
    this.myGrpCheck=config.loadData.myGrpCheck;
   }

  ngOnInit() {
    this.initialise();
  }

  setGeoValla(){

  }

  initialise(){
    this.myGrpName=this.config.loadData.myGrpName;
    this.myGrpCheck=this.config.loadData.myGrpCheck;
  }

setMygrpChek(value){
  this.myGrpCheck=value;
}
}
