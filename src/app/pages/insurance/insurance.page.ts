import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from '@ionic/angular';

import { UserProvider } from '../../providers/user/user';
import { PolicyPage } from '../policy/policy';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss'],
})
export class InsurancePage implements OnInit {
  @ViewChild('contactListSelect') contactListSelect: Select;

  public type: string;
  public allInsurances: Array<any> = [];
  public permanentLifeInsurances: Array<any> = [];
  public tempLifeInsurances: Array<any> = [];
  public universalLifeInsurances: Array<any> = [];
  public insurances: Array<any> = [];
  public contacts: Array<any> = [];
  public contact: any = {};
  public mainContact: any;
  public isLead: boolean = false;

  public currentNeeds: any = 0;
  public currentCoverage: any = 0;

  public svgHouseHoldLifeData: any;
  public svgHouseHoldDisabilityData: any;
  public svgHouseHoldLongtermcareData: any;
  public svgHouseHoldTravelData: any;
  public svgHouseHoldCriticalData: any;

  public svgIndividualLifeData: any;
  public svgIndividualDisabilityData: any;
  public svgIndividualLongtermcareData: any;
  public svgIndividualTravelData: any;
  public svgIndividualCriticalData: any;

  @Input() graphicData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserProvider,
              public appGlobal: AppGlobals) {
    this.init();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsurancePage');
  }

  init() {
    this.type = this.navParams.get('type');
    this.isLead = this.navParams.get('isLead');
    if(this.isLead) {
      this.contact = {};
    } else {
      this.contact = this.navParams.get('contact');
    }
    this.allInsurances = this.navParams.get('allInsurances');
    this.contacts = this.navParams.get('contacts');
    this.mainContact = _.find(this.contacts, {role: 'main'});
    this.getInsurances();
    this.getGraphicData();
  }

  getGraphicData() {
    let mainUser = this.mainContact;
    let coapplicantUser = _.find(this.contacts, {role: 'coapplicant'});
    let otherUsers = _.filter(this.contacts, function(obj){
      return obj.role == 'other';
    });
    for(let i = 0; i < 4; i++) {
      if(!otherUsers[i]) {
        otherUsers[i] = {};
      }
    }
    this.svgHouseHoldLifeData = {
      pageType : 'category',
      insuranceType : 'life',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 1550000,
      userMainCoverage : this.getCoverageValue('life', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('life', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('life', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('life', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('life', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('life', otherUsers[3].id, '')
    }
    this.svgHouseHoldDisabilityData = {
      pageType : 'category',
      insuranceType : 'disability',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 15500,
      userMainCoverage : this.getCoverageValue('disability', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('disability', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('disability', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('disability', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('disability', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('disability', otherUsers[3].id, '')
    };
    this.svgHouseHoldLongtermcareData = {
      pageType : 'category',
      insuranceType : 'longtermcare',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 15500,
      userMainCoverage : this.getCoverageValue('longtermcare', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('longtermcare', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('longtermcare', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('longtermcare', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('longtermcare', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('longtermcare', otherUsers[3].id, '')
    };
    this.svgHouseHoldCriticalData = {
      pageType : 'category',
      insuranceType : 'critical',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 700000,
      userMainCoverage : this.getCoverageValue('critical', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('critical', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('critical', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('critical', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('critical', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('critical', otherUsers[3].id, '')
    };
    this.svgHouseHoldTravelData = {
      pageType : 'category',
      insuranceType : 'travel',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 700000,
      userMainCoverage : this.getCoverageValue('travel', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('travel', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('travel', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('travel', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('travel', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('travel', otherUsers[3].id, '')
    };

    this.svgIndividualLifeData = {
      pageType : 'category',
      insuranceType : 'life',
      needs : 800000,
      coverage : 0,
      permanentCoverage: this.getCoverageValue('life', this.contact.id, 'wholelife'),
      temporaryCoverage : this.getCoverageValue('life', this.contact.id, 'term'),
      universalCoverage : this.getCoverageValue('life', this.contact.id, 'universal')
    };
    this.svgIndividualDisabilityData = {
      pageType : 'category',
      insuranceType : 'disability',
      needs : 5000,
      coverage : this.getCoverageValue('disability', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualLongtermcareData = {
      pageType : 'category',
      insuranceType : 'longtermcare',
      needs : 600000,
      coverage : this.getCoverageValue('longtermcare', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualTravelData = {
      pageType : 'category',
      insuranceType : 'travel',
      needs : 600000,
      coverage : this.getCoverageValue('travel', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualCriticalData = {
      pageType : 'category',
      insuranceType : 'critical',
      needs : 600000,
      coverage : this.getCoverageValue('critical', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
  }

  getCoverageValue(type: string, contactId: any, category: string) {
    let insurances;
    if(category && type == 'life') {
      insurances = _.filter(this.allInsurances, function(obj){
        return obj.type == type && obj.contact_id == contactId && obj.category == category;
      });
    } else {
      insurances = _.filter(this.allInsurances, function(obj){
        return obj.type == type && obj.contact_id == contactId;
      });
    }
    return _.sumBy(insurances, function(obj) {
      return obj.details.data.death_capital ? obj.details.data.death_capital : obj.details.data.base_capital;
    });
  }

  goBack() {
    $('.animated.home-graphic.graphic-' + this.type + ' .percentage-circle').css('animation', 'none');
    $('.animated.home-graphic.graphic-' + this.type + ' .percentage-circle').css('opacity', '1');
    $('.animated.home-graphic.graphic-' + this.type + ' .percent-circle-text').css('animation', 'none');
    $('.animated.home-graphic.graphic-' + this.type + ' .percent-circle-text').css('opacity', '1');

    let varStr = 'svgHouseHold' + this.type[0].toUpperCase() + this.type.slice(1) + 'Data';
    if(this[varStr].userMainCoverage) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-main').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-main').css('opacity', '1');
    }
    if(this[varStr].userCoapplicantCoverage) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-coapplicant').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-coapplicant').css('opacity', '1');
    }
    if(this[varStr].userOtherCoverage_one) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-1').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-1').css('opacity', '1');
    }
    if(this[varStr].userOtherCoverage_two) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-2').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-2').css('opacity', '1');
    }
    if(this[varStr].userOtherCoverage_three) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-3').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-3').css('opacity', '1');
    }
    if(this[varStr].userOtherCoverage_four) {
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-4').css('animation', 'none');
      $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-4').css('opacity', '1');
    }
    if(this.type == 'life') {
      if(this.svgIndividualLifeData.permanentCoverage) {
        $('.animated.home-graphic.graphic-life .graphic-label-permanent').css('animation', 'none');
        $('.animated.home-graphic.graphic-life .graphic-label-permanent').css('opacity', '1');
      }
      if(this.svgIndividualLifeData.temporaryCoverage) {
        $('.animated.home-graphic.graphic-life .graphic-label-temporary').css('animation', 'none');
        $('.animated.home-graphic.graphic-life .graphic-label-temporary').css('opacity', '1');
      }
      if(this.svgIndividualLifeData.universalCoverage) {
        $('.animated.home-graphic.graphic-life .graphic-label-universal').css('animation', 'none');
        $('.animated.home-graphic.graphic-life .graphic-label-universal').css('opacity', '1');
      }
    }
    this.navCtrl.pop();
  }

  goPolicy(policy) {
    this.navCtrl.push(PolicyPage, {policy: policy});
  }

  getItemBottomClass() {
    return this.type + '-bottom';
  }

  getHouseholdBtnClass() {
    return this.type + '-household-btn';
  }

  openContactList() {
    this.contactListSelect.open();
  }

  changeContact() {
    if(this.contact.id) {
      this.isLead = false;
    } else {
      this.isLead = true;
    }
    this.getInsurances();
    this.getGraphicData();
  }

  getInsurances() {
    let contactId = this.contact.id;
    let leadId = this.mainContact.lead_id;
    var that = this;
    if(this.type == 'life') {
      this.permanentLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'wholelife' && obj.contact_id == contactId;
        else
          return obj.type == 'life' && obj.category == 'wholelife' && obj.lead_id == leadId;

      });
      this.tempLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'term' && obj.contact_id == contactId;
        else
          return obj.type == 'life' && obj.category == 'term' && obj.lead_id == leadId;
      });
      this.universalLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'universal' && obj.contact_id == contactId;
        else
          return obj.type == 'life' && obj.category == 'universal' && obj.lead_id == leadId;
      });
    } else {
      this.insurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == that.type && obj.contact_id == contactId;
        else
          return obj.type == that.type && obj.lead_id == leadId;
      });
    }
  }

  getTotalValues(type: string, subType: string) {
    let insurances;
    var field = type;
    if(this.type == 'life') {
      if(subType == 'wholelife') {
        insurances = this.permanentLifeInsurances;
      } else if(subType == 'term') {
        insurances = this.tempLifeInsurances;
      } else if(subType == 'universal') {
        insurances = this.universalLifeInsurances;
      }
    } else {
      insurances = this.insurances;
    }
    if(field == 'coverage') {
      return this.appGlobal.priceFormatRound(_.sumBy(insurances, function(obj) {
        return obj.details.data.death_capital ? obj.details.data.death_capital : obj.details.data.base_capital;
      }));
    } else {
      return this.appGlobal.priceFormat(_.sumBy(insurances, function(obj) {
        return obj ? obj.details.data.monthly_payment : 0;
      }), 2);
    }
  }
}
