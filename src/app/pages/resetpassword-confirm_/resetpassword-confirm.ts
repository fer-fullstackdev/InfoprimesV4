import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { AppGlobals } from '../../shared/app.globals';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { TouchidPage } from '../touchid/touchid';
import { PasscodePage } from '../passcode/passcode';
import { UserService } from '../../services/user/user.service';

export class PasswordValidator {
  static validPassword(fc: FormControl){
    let val = fc.value;
    if(val == undefined) val = '';
    let num = val.match(/\d/g);
    if(num == null) {
      return ({validPassword: true});
    } else {
      if(num.length > 3) {
        return (null);
      } else {
        return ({validPassword: true});
      }
    }
  }
}

@Component({
  selector: 'page-resetpassword-confirm',
  templateUrl: 'resetpassword-confirm.html',
})
export class ResetpasswordConfirmPage implements OnInit {
  user: FormGroup;
  public submitAttempt: boolean = false;
  public password: string;
  public confirmPassword: string;
  private email: string;
  private reset_token: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private apiService: ApiService,
              private storage: Storage,
              private modalCtrl: ModalController,
              private touchId: TouchID,
              private appGlobal: AppGlobals,
              private userService: UserService,
              private zone: NgZone,
              private uiUtility: UiUtilsService) {
    this.email = this.navParams.get('email');
    this.reset_token = this.navParams.get('reset_token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordConfirmPage');
  }

  ngOnInit() {
    // this.zone.run(() => {
      this.user = new FormGroup({
        password: new FormControl('', Validators.compose([
          PasswordValidator.validPassword,
          Validators.minLength(10),
          Validators.required
        ])),
        confirmPassword: new FormControl('', Validators.compose([
          PasswordValidator.validPassword,
          Validators.minLength(10),
          Validators.required
        ]))
      });
    // });
  }

  goBack() {
    this.navCtrl.setRoot(LoginPage);
  }

  resetPWD() {
    // this.zone.run(() => {
      this.submitAttempt = true;
      if(!this.user.invalid) {
        if(this.password == this.confirmPassword) {
          this.uiUtility.showLoader();
          const params = {
            email: this.email,
            reset_token: this.reset_token,
            password: this.password,
            password_confirmation: this.confirmPassword
          };
          this.apiService.post1('/auth/reset', params)
            .then((res) => {
              this.uiUtility.hideLoader();
              let resBody = JSON.parse(res._body);
              this.storage.set('token', resBody.token);
              this.userService.userID = resBody.user.id;

              this.touchId.isAvailable()
                .then(
                  (res) => {
                    let touchIdModal = this.modalCtrl.create(TouchidPage, {});
                    touchIdModal.present()
                      .then(res => {
                        this.appGlobal.isOpenModal = true;
                      });
                    touchIdModal.onWillDismiss(res => {
                      this.navCtrl.setRoot(TabsPage);
                    });
                  },
                  (err) => {
                    let passcodeModal = this.modalCtrl.create(PasscodePage, {})
                    passcodeModal.present()
                      .then(res => {
                        this.appGlobal.isOpenModal = true;
                      });
                    passcodeModal.onWillDismiss(res => {
                      this.navCtrl.setRoot(TabsPage);
                    });
                  }
                );

            }).catch((e) => {
              this.uiUtility.hideLoader();
              console.log(e);
            });
        }
      }
    // });
  }
}
