import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from '@ionic/angular';

import { ApiProvider } from '../../providers/api/api';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils';

import { SettingPage } from '../setting/setting';
import { HouseholdProfilesPage } from '../household-profiles/household-profiles';
import { ProfileReviewPage } from '../profile-review/profile-review';
import { MyPoliciesPage } from '../my-policies/my-policies';
import * as _ from 'lodash';
import { HouseholdProfilePage } from '../household-profile/household-profile';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  public allData: any;
  public myProfile: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiProvider,
              public userService: UserProvider,
              public uiUtility: UiUtilsProvider) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
  }

  goSetting() {
    this.navCtrl.push(SettingPage);
  }

  goHouseholdProfiles() {
    this.navCtrl.push(HouseholdProfilesPage);
  }

  goHouseholdProfile(contact: any) {
    this.navCtrl.push(HouseholdProfilePage, {contact: contact});
  }

  goProfileReview() {
    this.navCtrl.push(ProfileReviewPage);
  }

  goMyPolicies() {
    this.navCtrl.push(MyPoliciesPage);
  }
}
