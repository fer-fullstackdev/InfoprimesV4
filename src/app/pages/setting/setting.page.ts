import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

import * as _ from 'lodash';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public language: string;
  public allData: any;
  public myProfile: any;
  public leadId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              private uiUtility: UiUtilsProvider,
              public apiService: ApiProvider,
              public userService: UserProvider,
              public appGlobal: AppGlobals,
              public translate: TranslateService,
              private storage: Storage) {
    this.init();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  init() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
    this.language = this.userService.lang;
    this.leadId = this.userService.leadId;
  }

  goBack() {
    this.navCtrl.pop();
  }

  confirmLogout() {
    let that = this;
    let logout = function() {
      that.storage.remove('token')
        .then(res => {
          that.userService.setUserLeadId('', []);
          that.appGlobal.passedAuthPhases = false;
          that.userService.userID = '';
          that.appCtrl.getRootNav().setRoot(LoginPage);
        })
        .catch(e => { console.log(e); });
    }
    this.translate.get(['GENERIC.CONFIRM', 'GENERIC.ARE_YOU_SURE', 'GENERIC.CANCEL', 'GENERIC.OKAY'], {}).subscribe((res: string) => {
      this.uiUtility.confirmAlertBox(res['GENERIC.CONFIRM'], res['GENERIC.ARE_YOU_SURE'], res['GENERIC.CANCEL'], res['GENERIC.OKAY'], function() {}, logout);
    });

  }

  changeLang() {
    this.setLang(this.language);
  }

  setLang(lang: string) {
    this.userService.setLang(lang);
  }

  changeLeadId() {
    this.userService.setUserLeadId(this.leadId, this.userService.leadIds);
    this.storage.get('token')
      .then(res => {
        if(!res) return false;
        let params = {
          include: 'contacts,insurance,insurance.details,insurance.beneficiaries,insurance.holders,insurance.product,assignments'
        };
        this.uiUtility.showLoader();
        this.apiService.get1('/client/data/' + this.userService.leadId, params, res)
          .subscribe((res) => {
            this.uiUtility.hideLoader();
            let authStr = res.headers.get('Authorization');
            let arr = authStr.split('Bearer ');
            let token = arr[1];
            this.storage.set('token', token);
            this.userService.userData = res.body.data;
            this.init();
          },
          (e) => {
            console.log(e);
            this.storage.remove('token');
          });
      })
      .catch(e => { console.log(e); });
  }

}
