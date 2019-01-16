import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

declare var cordova;

@Component({
  selector: 'app-broker',
  templateUrl: './broker.page.html',
  styleUrls: ['./broker.page.scss'],
})
export class BrokerPage implements OnInit {
  public myBroker: any;
  private email;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public uiUtility: UiUtilsService,
              public apiService: ApiService,
              private sms: SMS,
              private emailComposer: EmailComposer,
              private callNumber: CallNumber,
              private platform: Platform,
              public translate: TranslateService,
              public userService: UserService,
              private appGlobal: AppGlobals) {

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrokerPage');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    let brokers = this.userService.userData.assignments.data;
    let contacts = this.userService.userData.contacts.data;
    let myContact = _.find(contacts, {role: 'main'});
    let broker = _.find(brokers, {lead_id: myContact.lead_id});
    this.myBroker = broker.user ? broker.user.data[0] : {};
  }

  ionViewWillLeave() {
    this.appGlobal.preventPauseEV_1 = false;
    this.appGlobal.preventPauseEV_2 = false;
    this.appGlobal.preventPauseEV_3 = false;
  }

  callPhone(number) {
    this.appGlobal.preventPauseEV_1 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
    }, 9000);
    this.callNumber.callNumber(number, true)
      .then(res => {
        console.log('Launched dialer!', res)}
      )
      .catch(err => {
        console.log('Error launching dialer', err);
      });
  }

  smsPhone(number) {
    this.appGlobal.preventPauseEV_2 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
    }, 9000);
    this.translate.get('BROKER.SMS_BASE_MESSAGE', {}).subscribe((res: string) => {
      this.sms.send(number, res, {replaceLineBreaks: false, android: {intent: 'INTENT'}})
        .then(res => { console.log('smsPhone open success: ', res); })
        .catch(e => { console.log('smsPhone error: ', e); });
    });
  }

  sendEmail(email) {
    this.appGlobal.preventPauseEV_3 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
    }, 9000);

    if (this.platform.is('cordova')) {
      cordova.plugins.email.isAvailable(function (hasAccount) {
        if(hasAccount) {
          let sendEmail = {
            to: email,
            subject: '',
            body: ''
          }
          cordova.plugins.email.open(sendEmail);
        }
      });
      /*
      this.email = {
        to: email,
        subject: '',
        body: ''
      };
      this.emailComposer.isAvailable()
        .then((available: boolean) =>{
          if(available) {
            console.log('111')
            this.emailComposer.open(this.email)
              .then(res => {
                alert('32432')
                console.log('222: ', res);
              })
              .catch(e => {
                console.log('333: ', e);
                alert('32432fdgds')
              });
          } else {
            alert('eeee')
            console.log('444');
          }
        })
        .catch(e => {
          console.log('555', e);
        });
      */
    }
  }
}
