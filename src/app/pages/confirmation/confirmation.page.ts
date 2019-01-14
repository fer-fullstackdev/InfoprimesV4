import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App) {}

  ngOnInit() {
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
