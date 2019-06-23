import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loginEnabled: boolean = false;
  mobileNumberSetCorrectly: boolean = false;
  mobileNumber: string;
  smsCode:string;
  name:string='';
  phoneNumber:string

  constructor(private config: ConfigService) {
    this.initialize();
  }

  initialize() {
    this.config.loginState.subscribe(loginState => {
      this.loginEnabled = loginState;
    });
    this.config.numberValidState.subscribe(state => {
      this.mobileNumberSetCorrectly = state;
        this.name=this.config.loadData.myName;
        this.phoneNumber=this.config.loadData.myNum;
    });
  }

  setMyNum() {
    this.config.setMyNum(this.mobileNumber);
  }

  checkSmsCode(){
    this.config.checkCodeSMS(this.smsCode);
  }



}
