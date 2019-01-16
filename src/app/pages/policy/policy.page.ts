import { Component, OnInit } from '@angular/core';
// import { NavController, NavParams, App } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';

import { PolicyStatusPage } from '../policy-status/policy-status.page';
import { HouseholdProfilePage } from '../household-profile/household-profile.page';
import { PaperworkPage } from '../paperwork/paperwork.page';
import { TabsPage } from '../tabs/tabs.page';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  public policy: any;
  public policyHousehold: any;
  public beneficiaries: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public uiUtility: UiUtilsService,
              public apiService: ApiService,
              public userService: UserService,
              public appGlobal: AppGlobals) {
    this.init();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyPage');
  }

  init() {
    this.policy = this.navParams.get('policy');
    let contacts = this.userService.userData.contacts.data;
    this.policyHousehold = _.find(contacts, {id: this.policy.contact_id});
    var that = this;
    _.forEach(this.policy.beneficiaries.data, function(beneficiary) {
      that.beneficiaries.push(_.find(contacts, {id: beneficiary.contact_id}));
    });
  }

  goBack() {
    // this.navCtrl.pop();
  }

  goPolicyStatus(policy: any) {
    // this.navCtrl.push(PolicyStatusPage, {policy: policy});
  }

  goHouseholdProfile(contact: string) {
    // this.navCtrl.push(HouseholdProfilePage, {contact: contact});
  }

  goPaperWork() {
    // this.navCtrl.push(PaperworkPage);
  }

  goBroker() {
    // this.appCtrl.getRootNav().push(TabsPage, {tabIndex: 1});
  }

  calcDate(deliveredDate: any, durationYears: any, format: string) {
    return moment(deliveredDate, format).add(durationYears, 'y');
  }

}
