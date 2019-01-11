import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, Platform } from '@ionic/angular';

import { TouchID } from '@ionic-native/touch-id';
import { PasscodePage } from '../passcode/passcode';
import { AppGlobals } from '../../shared/app.globals';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-touchid',
  templateUrl: 'touchid.html',
})
export class TouchidPage {
  private backButtonUnregister: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private touchId: TouchID,
              private viewCtrl: ViewController,
              private appGlobalService: AppGlobals,
              private modalCtrl: ModalController,
              public translate: TranslateService,
              platform: Platform) {
    this.backButtonUnregister = platform.registerBackButtonAction(() => {});
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TouchidPage');
    if(this.navParams.get('resume')) {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
        .then(res => {
          this.navCtrl.pop()
            .then(res => {
              this.appGlobalService.isOpenModal = false;
            });
        })
        .then(e => { console.log(e); });
    }
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  init() {

  }

  openTouchID() {
    this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
      .then(res => {
        this.navCtrl.pop()
          .then(res => {
            this.appGlobalService.isOpenModal = false;
          });
      })
      .then(e => { console.log(e); });
  }

  goPasscodePage() {
    this.modalCtrl.create(PasscodePage).present()
      .then(res => {
        this.navCtrl.remove(this.viewCtrl.index);
      });
  }
}
