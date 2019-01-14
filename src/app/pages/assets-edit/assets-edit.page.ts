import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'app-assets-edit',
  templateUrl: './assets-edit.page.html',
  styleUrls: ['./assets-edit.page.scss'],
})
export class AssetsEditPage implements OnInit {
  private action: string;
  public data: Object = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private keyboard: Keyboard) {
    this.keyboard.hideKeyboardAccessoryBar(false);
    this.action = this.navParams.get('action');
    this.data   = this.navParams.get('data');
    this.init();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetsEditPage');
  }

  init() {
  }

  close() {
    this.keyboard.hideKeyboardAccessoryBar(true);
    this.viewCtrl.dismiss();
  }

  save() {
    this.close();
  }
}
