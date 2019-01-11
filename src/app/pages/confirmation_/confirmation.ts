import { Component } from '@angular/core';
import { NavController, NavParams, App } from '@ionic/angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  goBroker() {
    this.appCtrl.getRootNav().push(TabsPage, {tabIndex: 1});
  }

  goBack() {
    this.navCtrl.pop();
  }
}
