import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from '@ionic/angular';

import { TouchID } from '@ionic-native/touch-id/ngx';
import { PasscodePage } from '../passcode/passcode.page';
import { AppGlobals } from '../../shared/app.globals';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-touchid',
  templateUrl: './touchid.page.html',
  styleUrls: ['./touchid.page.scss'],
})
export class TouchidPage implements OnInit {
  private backButtonUnregister: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private touchId: TouchID,
              private appGlobalService: AppGlobals,
              private modalCtrl: ModalController,
              public translate: TranslateService,
              platform: Platform) {
    // this.backButtonUnregister = platform.registerBackButtonAction(() => {});
    this.init();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TouchidPage');
    if(this.navParams.get('resume')) {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
        .then(res => {
          /*
          this.navCtrl.pop()
            .then(res => {
              this.appGlobalService.isOpenModal = false;
            });
          */
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
        /*
        this.navCtrl.pop()
          .then(res => {
            this.appGlobalService.isOpenModal = false;
          });
        */
      })
      .then(e => { console.log(e); });
  }

  goPasscodePage() {
    /*
    this.modalCtrl.create(PasscodePage).present()
      .then(res => {
        this.navCtrl.remove(this.viewCtrl.index);
      });
    */
  }

}
