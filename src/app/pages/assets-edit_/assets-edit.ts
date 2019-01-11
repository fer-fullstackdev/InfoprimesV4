import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-assets-edit',
  templateUrl: 'assets-edit.html',
})
export class AssetsEditPage {
  private action: string;
  public data: Object = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private keyboard: Keyboard) {
    this.keyboard.hideFormAccessoryBar(false);
    // this.keyboard.hideKeyboardAccessoryBar(false);
    this.action = this.navParams.get('action');
    this.data   = this.navParams.get('data');
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetsEditPage');
  }

  init() {
  }

  close() {
    this.keyboard.hideFormAccessoryBar(false);
    // this.keyboard.hideKeyboardAccessoryBar(true);
    this.modalCtrl.dismiss();
  }

  save() {
    this.close();
  }
}
