import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-start-cont',
  templateUrl: './start-cont.page.html',
  styleUrls: ['./start-cont.page.scss'],
})
export class StartContPage implements OnInit {
  currentday: string;
  currentmonth: string;
  currentyear: string;
  currentHrs: string;
  currentMins: string;
  currentseconds: string;
  startTimmer: boolean = false;
  clock:string;
  clockday:string;
  constructor(public config:ConfigService) { }

  ngOnInit() {
    this.startTimmer=true;
    this.timeManager();
  }

  async timeManager() {
    while (this.startTimmer) {
      let time = new Date();
      this.currentday = time.getDate().toString();
      this.currentmonth = (time.getMonth()+1).toString();
      this.currentyear = time.getFullYear().toString();
      this.currentHrs = time.getHours().toString();
      this.currentMins = time.getMinutes().toString();
      this.currentseconds = time.getSeconds().toString();
      //console.log(time.get().toString());
      this.updateClock();
      await this.delay(1000);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateClock(){
    this.clock=this.currentHrs+":"+this.currentMins+":"+this.currentseconds;
    this.clockday=this.currentday+":"+this.currentmonth+":"+this.currentyear;
  }

}
