import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { HomePage } from '../home/home';
import { BrokerPage } from '../broker/broker';
import { MyProfilePage } from '../my-profile/my-profile';
import { ReclamationPage } from '../reclamation/reclamation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = BrokerPage;
  tab3Root = MyProfilePage;
  tab4Root = ReclamationPage;
  public tabIndex: number;

  constructor(public navParams: NavParams) {
    this.tabIndex = this.navParams.get('tabIndex');
  }
}
