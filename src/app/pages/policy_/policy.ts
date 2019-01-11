import { Component } from '@angular/core';
import { NavController, NavParams, App } from '@ionic/angular';

import { PolicyStatusPage } from '../policy-status/policy-status';
import { HouseholdProfilePage } from '../household-profile/household-profile';
import { PaperworkPage } from '../paperwork/paperwork';
import { TabsPage } from '../tabs/tabs';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {
  public policy: any;
  public policyHousehold: any;
  public beneficiaries: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public uiUtility: UiUtilsService,
              public apiService: ApiService,
              public userService: UserService,
              public appGlobal: AppGlobals) {
    this.init();
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
    this.navCtrl.pop();
  }

  goPolicyStatus(policy: any) {
    this.navCtrl.push(PolicyStatusPage, {policy: policy});
  }

  goHouseholdProfile(contact: string) {
    this.navCtrl.push(HouseholdProfilePage, {contact: contact});
  }

  goPaperWork() {
    this.navCtrl.push(PaperworkPage);
  }

  goBroker() {
    this.appCtrl.getRootNav().push(TabsPage, {tabIndex: 1});
  }

  calcDate(deliveredDate: any, durationYears: any, format: string) {
    return moment(deliveredDate, format).add(durationYears, 'y');
  }
}
