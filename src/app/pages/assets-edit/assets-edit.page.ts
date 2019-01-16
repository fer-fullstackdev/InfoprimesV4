import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

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
              public modalCtrl: ModalController,
              private keyboard: Keyboard) {
    this.keyboard.hideFormAccessoryBar(false);
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
    this.keyboard.hideFormAccessoryBar(true);
    this.modalCtrl.dismiss();
  }

  save() {
    this.close();
  }
}
