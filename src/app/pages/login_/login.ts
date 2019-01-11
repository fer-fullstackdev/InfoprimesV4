import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TouchidPage } from '../touchid/touchid';
import { PasscodePage } from '../passcode/passcode';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  user: FormGroup;
  public email: string;
  public password: string;
  public unauthorized: boolean = false;
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              private apiService: ApiService,
              private uiUtility: UiUtilsService,
              private userService: UserService,
              private storage: Storage,
              private touchId: TouchID,
              private appGlobal: AppGlobals,
              private modalCtrl: ModalController) {
    this.init();
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ]))
    });
  }

  init() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.submitAttempt = true;
    if(!this.user.invalid) {
      let params = {
        email: this.email,
        password: this.password
      };
      this.uiUtility.showLoader();
      this.apiService.post1('/auth/token', params)
        .then(res => {
          this.unauthorized = false;
          let resBody = JSON.parse(res._body);
          let token1 = resBody.token;
          this.storage.set('token', token1);

          this.apiService.get1('/auth/user', '', token1)
            .subscribe((res) => {
              this.uiUtility.hideLoader();
              let authStr = res.headers.get('Authorization');
              let arr = authStr.split('Bearer ');
              let sentEmail = res.body.client.email;
              let token2 = arr[1];
              this.storage.set('token', token2);
              this.userService.userID = res.body.client.id;
              if(res.body.client.active) {
                this.touchId.isAvailable()
                  .then(
                    (res) => {
                      let touchIdModal = this.modalCtrl.create(TouchidPage, {})
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
              } else {
                this.navCtrl.setRoot(RegisterPage, {registered: true, fromAppStart: true, sentEmail: sentEmail});
              }
            },
            (e) => {
              console.log(e);
              this.uiUtility.hideLoader();
              this.storage.remove('token');
            });
        })
        .catch(e => {
          this.uiUtility.hideLoader();
          this.unauthorized = true;
        });
    }
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  changeAuthStatus(value) {
    this.unauthorized = false;
  }
}
