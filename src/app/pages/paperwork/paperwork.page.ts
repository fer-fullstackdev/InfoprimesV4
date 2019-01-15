import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-paperwork',
  templateUrl: './paperwork.page.html',
  styleUrls: ['./paperwork.page.scss'],
})
export class PaperworkPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaperworkPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
