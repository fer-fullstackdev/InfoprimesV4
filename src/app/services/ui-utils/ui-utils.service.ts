import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiUtilsService {

  loading: any;

  constructor(public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  alertBox(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  confirmAlertBox(title, message, cancelTxt, okTxt, cancelFunc, okFunc) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: cancelTxt,
          role: 'cancel',
          handler: () => {
            cancelFunc();
          }
        },
        {
          text: okTxt,
          handler: () => {
            okFunc();
          }
        }
      ]
    });
    alert.present();
  }

  toastMsg(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: 'custom-toast-message'
    });
    toast.present();
  }

  showLoader(content: string = '') {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
    return this.loading;
  }

  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
