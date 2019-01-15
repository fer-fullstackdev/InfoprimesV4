import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

import { TouchidPage } from '../touchid/touchid.page';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';

import * as _ from 'lodash';
import { AppGlobals } from '../../shared/app.globals';

import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { TouchID } from '@ionic-native/touch-id';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.page.html',
  styleUrls: ['./passcode.page.scss'],
})
export class PasscodePage implements OnInit {
  public selectedIndexArr: Array<any> = [];
  public selectedIndexArrBackup: Array<any> = [];
  public isPasscode: boolean;
  progressElm: HTMLElement;
  private backButtonUnregister: any;
  private passcodeObj: {};
  public touchIdAvailable: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public uiUtility: UiUtilsService,
              private vibration: Vibration,
              private viewCtrl: ViewController,
              private appGlobalService: AppGlobals,
              private modalCtrl: ModalController,
              private userService: UserService,
              public translate: TranslateService,
              private zone: NgZone,
              private touchId: TouchID,
              platform: Platform) {
    this.backButtonUnregister = platform.registerBackButtonAction(() => {});
    this.init();
    this.checkPasscode();
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasscodePage');
  }

  init() {
    this.touchId.isAvailable()
      .then(res => {
        this.touchIdAvailable = true;
      })
      .catch(e => { console.log(e); });
  }

  checkPasscode() {
    this.zone.run(() => {
      this.storage.get('passcodeObj')
        .then(res => {
          if(res) {
            this.passcodeObj = JSON.parse(res);
            if(this.passcodeObj[this.userService.userID])
              this.isPasscode = true;
            else
              this.isPasscode = false;
          } else {
            this.passcodeObj = {};
            this.isPasscode = false;
          }
        })
        .catch(e => { console.log(e); });
    });
  }

  shakeAction(flag) {
    this.zone.run(() => {
      this.progressElm = <HTMLElement>document.querySelector('#progress-area');
      let progressAreaEle = document.querySelectorAll('.progress-round');
      this.progressElm.classList.add('shake-action');
      _.forEach(progressAreaEle, function(v) {
        v.classList.add('progress-filled-invalid');
      });
      setTimeout(() => {
        this.progressElm.classList.remove('shake-action');
        _.forEach(progressAreaEle, function(v) {
          v.classList.remove('progress-filled-invalid');
        });
        this.selectedIndexArr = [];
        if(!flag) {
          this.selectedIndexArrBackup = [];
        }
      }, 1000);
    });
  }

  clickTouchItem(index) {
    this.zone.run(() => {
      if(this.selectedIndexArr.length < 4) {
        this.selectedIndexArr.push(index);
      }
      if(this.selectedIndexArr.length == 4) {
        const passcodeStr = _.map(this.selectedIndexArr).join('');
        if(!this.isPasscode && !this.selectedIndexArrBackup.length) {
          this.selectedIndexArrBackup = this.selectedIndexArr;
          this.selectedIndexArr = [];
        } else if(!this.isPasscode && this.selectedIndexArrBackup.length) {
          if(_.isEqual(this.selectedIndexArr, this.selectedIndexArrBackup)) {
            this.passcodeObj[this.userService.userID] = passcodeStr;
            this.storage.set('passcodeObj', JSON.stringify(this.passcodeObj));
            this.navCtrl.pop()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else {
            this.translate.get('PASSCODE.PASSCODE_CONFIRM_NOT_MATCH', {}).subscribe((res: string) => {
              this.uiUtility.toastMsg(res);
            });
            this.shakeAction(false);
            this.vibration.vibrate(1000);
          }
        } else if(this.isPasscode) {
          if(this.passcodeObj[this.userService.userID] == passcodeStr) {
            this.navCtrl.pop()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else {
            this.shakeAction(true);
            this.translate.get('PASSCODE.PASSCODE_DOES_NOT_MATCH', {}).subscribe((res: string) => {
              this.uiUtility.toastMsg(res);
            });
            this.vibration.vibrate(1000);
          }
        }
      }
    });
  }

  delCharacter() {
    this.zone.run(() => {
      this.selectedIndexArr.pop();
    });
  }

  goToTouchIdPage() {
    this.modalCtrl.create(TouchidPage).present()
      .then(res => {
        this.navCtrl.remove(this.viewCtrl.index);
      });
  }

}
