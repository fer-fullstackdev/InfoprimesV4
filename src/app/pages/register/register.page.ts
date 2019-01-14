import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils';
import { ApiProvider } from '../../providers/api/api';

import { LoginPage } from '../login/login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';

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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: FormGroup;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public registered: boolean = false;
  public registerError: boolean = false;
  public registerErrorMsg: string;
  public submitAttempt: boolean = false;
  public fromAppStart: boolean = false;
  public sentEmail: string;
  public resentEmail: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public uiUtility: UiUtilsProvider,
              public apiService: ApiProvider,
              private storage: Storage,
              private userService: UserProvider,
              private oneSignal: OneSignal,
              private platform: Platform) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
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
    this.registered = this.navParams.get('registered');
    this.fromAppStart = this.navParams.get('fromAppStart');
    this.sentEmail = this.navParams.get('sentEmail');

    // this.registered = true;
  }

  goBack(fromAppStart) {
    if(fromAppStart) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.pop();
    }
  }

  changeResStatus(value) {
    this.registerError = false;
  }

  register() {
    this.submitAttempt = true;
    if (this.platform.is('cordova')) {
      this.oneSignal.getIds().then((ids) => {
        if(!this.user.invalid && this.password == this.confirmPassword) {
          let params = {
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
            device_token: ids.userId
          };
          this.uiUtility.showLoader();
          this.apiService.post1('/auth/register', params)
            .then(res => {
              this.uiUtility.hideLoader();
              let resBody = JSON.parse(res._body);
              this.userService.userID = resBody.user.id;

              this.storage.set('token', resBody.token)
                .then(res => {
                  this.registered = true;
                })
                .catch(e => { console.log(e); });
            })
            .catch(e => {
              this.uiUtility.hideLoader();
              let errorBody = JSON.parse(e._body);
              this.registerError = true;
              this.registerErrorMsg = errorBody.errors.email[0];
            });
          }
      });
    }
  }

  resendEmail() {
    this.uiUtility.showLoader();
    this.storage.get('token')
      .then(res => {
        if(res) {
          this.apiService.get1('/auth/resend-activation', '', res)
            .subscribe((res) => {
              console.log('resend-activation res: ', res);
              this.uiUtility.hideLoader();
              let resBody = res.body;
              if(resBody.success) {
                let authStr = res.headers.get('Authorization');
                let arr = authStr.split('Bearer ');
                this.storage.set('token', arr[1]);
                this.resentEmail = true;
              }
            },
            (e) => {
              this.uiUtility.hideLoader();
              console.log(e);
            });
        }
      })
      .catch(e => { console.log(e); });
  }

}
