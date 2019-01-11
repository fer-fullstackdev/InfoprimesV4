import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage implements OnInit {
  user: FormGroup;
  public email: string;
  public emailSent: boolean = false;
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private apiService: ApiService,
              public translate: TranslateService,
              private uiUtility: UiUtilsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ]))
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  resetPassword() {
    this.submitAttempt = true;
    if(!this.user.invalid) {
      let params = {
        email: this.email
      };
      this.uiUtility.showLoader();
      this.apiService.get1('/auth/reset', params)
        .subscribe((res) => {
          this.uiUtility.hideLoader();
          if(res.success) {
            this.emailSent = true;
          } else {
            let errorMsg = res.error;
            this.translate.get('GENERIC.ERROR', {}).subscribe((res: string) => {
              this.uiUtility.alertBox(res, errorMsg);
            });
          }
        },
        (e) => {
          this.uiUtility.hideLoader();
          let errors = e.error.errors;
          let errorMsg = '';
          if(errors) {
            Object.keys(errors).map(function(k) {
              errorMsg += ' ' + errors[k][0];
            });
          } else {
            errorMsg = e.error.message;
          }
          this.translate.get('GENERIC.ERROR', {}).subscribe((res: string) => {
            this.uiUtility.alertBox(res, errorMsg);
          });
        });
    }
  }
}
