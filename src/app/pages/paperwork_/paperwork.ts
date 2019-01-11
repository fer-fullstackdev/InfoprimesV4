import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-paperwork',
  templateUrl: 'paperwork.html',
})
export class PaperworkPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaperworkPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
