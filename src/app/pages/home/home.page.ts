import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { NavController, NavParams, IonSlides, IonSelect } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { InsurancePage } from '../insurance/insurance.page';
import { PolicyPage } from '../policy/policy.page';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  @ViewChild('contactListSelect') contactListSelect: IonSelect;

  public policiesStatus: string = 'current';
  public lifeInsurance: Array<any> = [];
  public disabilityInsurance: Array<any> = [];
  public longTermInsurance: Array<any> = [];
  public criticalInsurance: Array<any> = [];
  public travelInsurance: Array<any> = [];
  public curLifeInsurance: Array<any> = [];
  public curDisabilityInsurance: Array<any> = [];
  public curLongTermInsurance: Array<any> = [];
  public curCriticalInsurance: Array<any> = [];
  public curTravelInsurance: Array<any> = [];
  public penLifeInsurance: Array<any> = [];
  public penDisabilityInsurance: Array<any> = [];
  public penLongTermInsurance: Array<any> = [];
  public penCriticalInsurance: Array<any> = [];
  public penTravelInsurance: Array<any> = [];
  public contacts:  Array<any> = [];
  public contact: any = {};
  public mainContact: any;
  public insurances: any;
  public isLead: boolean = true;
  public slideIndex: number = 0;
  // public animatedInsurances: any;
  public animatedInsurances = {
    household: {
      life: false, disability: false, longtermcare: false, critical: false, travel: false
    },
    individual: {
      life: false, disability: false, longtermcare: false, critical: false, travel: false
    }
  };

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

  @Input() graphicData: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiService,
              public uiUtility: UiUtilsService,
              public userService: UserService,
              private storage: Storage,
              public appGlobal: AppGlobals) { }

  ngOnInit() {
  }

  initVars() {
    this.policiesStatus = 'current';
    this.contacts = [];
    this.contact = {};
    this.slideIndex = 0;
    this.animatedInsurances = {
      household: {
        life: false, disability: false, longtermcare: false, critical: false, travel: false
      },
      individual: {
        life: false, disability: false, longtermcare: false, critical: false, travel: false
      }
    };
  }

  ionViewWillEnter() {
    this.initAnimatedInsurances();
    this.loadData();
  }

  loadData() {
    this.uiUtility.showLoader();
    this.storage.get('token')
      .then(res => {
        this.apiService.get1('/client/resolve', '', res)
          .subscribe((res) => {
            this.userService.setUserLeadId(_.max(Object.keys(res.body)), Object.keys(res.body));
            let authStr = res.headers.get('Authorization');
            let arr = authStr.split('Bearer ');
            let token = arr[1];
            let params1 = {
              include: 'contacts,insurance,insurance.details,insurance.beneficiaries,insurance.holders,insurance.product,assignments'
            };

            this.apiService.get1('/client/data/' + this.userService.leadId, params1, token)
              .subscribe((res) => {
                let authStr = res.headers.get('Authorization');
                let arr = authStr.split('Bearer ');
                let token = arr[1];
                this.storage.set('token', token);

                this.userService.userData = res.body.data;

                this.userService.setLang(this.userService.userData.language);
                this.contacts = this.userService.userData.contacts.data;
                this.mainContact = _.find(this.contacts, {role: 'main'});
                this.insurances = this.userService.userData.insurance.data;
                this.getAllInsurance();
                this.getGraphicData();

                let params2 = {
                  include: 'main,main.asset,main.liability,coap,coap.asset,coap.liability,others,mortgages,external,main.details,coap.details'
                };
                this.apiService.get1('/client/data/' + this.userService.leadId +'/fna', params2, token)
                  .subscribe((res) => {
                    this.uiUtility.hideLoader();
                    let authStr = res.headers.get('Authorization');
                    let arr = authStr.split('Bearer ');
                    let token = arr[1];
                    this.storage.set('token', token);

                    this.userService.mainData = res.body.data.main.data;

                    this.userService.coapplicantData = res.body.data.coap.data;
                    this.userService.otherData = res.body.data.others.data;
                    this.userService.mortgageData = res.body.data.mortgages.data;
                    this.userService.externalData = res.body.data.external.data;
                  },
                  (e) => {
                    console.log(e);
                    this.storage.remove('token');
                  });
              },
              (e) => {
                console.log(e);
                this.storage.remove('token');
              });
          },
          (e) => {
            console.log(e);
            this.storage.remove('token');
          });
      })
      .catch(e => { console.log(e); });
  }

  initAnimatedInsurances() {
    this.animatedInsurances = {
      household: {
        life: false, disability: false, longtermcare: false, critical: false, travel: false
      },
      individual: {
        life: false, disability: false, longtermcare: false, critical: false, travel: false
      }
    };
    switch(this.slideIndex) {
      case 0:
        this.animatedInsurances.household.life = true;
        this.animatedInsurances.individual.life = true;
      break;
      case 1:
        this.animatedInsurances.household.disability = true;
        this.animatedInsurances.individual.disability = true;
      break;
      case 2:
        this.animatedInsurances.household.longtermcare = true;
        this.animatedInsurances.individual.longtermcare = true;
      break;
      case 3:
        this.animatedInsurances.household.critical = true;
        this.animatedInsurances.individual.critical = true;
      break;
      case 4:
        this.animatedInsurances.household.travel = true;
        this.animatedInsurances.individual.travel = true;
      break;
    }
  }

  setAnimatedInsurance(slideIndex: number) {
    if(slideIndex == 0) {
      this.animatedInsurances.household.life = true;
      this.animatedInsurances.individual.life = true;
    }
    if(slideIndex == 1) {
      this.animatedInsurances.household.disability = true;
      this.animatedInsurances.individual.disability = true;
    }
    if(slideIndex == 2) {
      this.animatedInsurances.household.longtermcare = true;
      this.animatedInsurances.individual.longtermcare = true;
    }
    if(slideIndex == 3) {
      this.animatedInsurances.household.critical = true;
      this.animatedInsurances.individual.critical = true;
    }
    if(slideIndex == 4) {
      this.animatedInsurances.household.travel = true;
      this.animatedInsurances.individual.travel = true;
    }
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
      pageType : 'home',
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
      pageType : 'home',
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
      pageType : 'home',
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
      pageType : 'home',
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
      pageType : 'home',
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
      pageType : 'home',
      insuranceType : 'life',
      needs : 800000,
      coverage : 0,
      permanentCoverage: this.getCoverageValue('life', this.contact.id, 'wholelife'),
      temporaryCoverage : this.getCoverageValue('life', this.contact.id, 'term'),
      universalCoverage : this.getCoverageValue('life', this.contact.id, 'universal')
    };
    this.svgIndividualDisabilityData = {
      pageType : 'home',
      insuranceType : 'disability',
      needs : 5000,
      coverage : this.getCoverageValue('disability', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualLongtermcareData = {
      pageType : 'home',
      insuranceType : 'longtermcare',
      needs : 600000,
      coverage : this.getCoverageValue('longtermcare', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualTravelData = {
      pageType : 'home',
      insuranceType : 'travel',
      needs : 600000,
      coverage : this.getCoverageValue('travel', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualCriticalData = {
      pageType : 'home',
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
      insurances = _.filter(this.insurances, function(obj){
        return obj.type == type && obj.contact_id == contactId && obj.category == category;
      });
    } else {
      insurances = _.filter(this.insurances, function(obj){
        return obj.type == type && obj.contact_id == contactId;
      });
    }
    return _.sumBy(insurances, function(obj) {
      return obj.details.data.death_capital ? obj.details.data.death_capital : obj.details.data.base_capital;
    });
  }

  slideChanged() {
    let slideIndex: number;
    this.slides.getActiveIndex().then(index => {
      slideIndex = index;
    });
    
    if(slideIndex == 4) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
    if(slideIndex == 0) {
      this.slides.lockSwipeToPrev(true);
    } else {
      this.slides.lockSwipeToPrev(false);
    }
    this.setAnimatedInsurance(this.slideIndex);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.appGlobal.passedAuthPhases = true;
  }

  getAllInsurance() {
    let contactId = this.contact.id;
    let leadId = this.mainContact.lead_id;
    var that = this;

    this.lifeInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'life' && obj.contact_id == contactId;
      else
        return obj.type == 'life' && obj.lead_id == leadId;
    });
    this.disabilityInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'disability' && obj.contact_id == contactId;
      else
        return obj.type == 'disability' && obj.lead_id == leadId;
    });
    this.longTermInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'longtermcare' && obj.contact_id == contactId;
      else
        return obj.type == 'longtermcare' && obj.lead_id == leadId;
    });
    this.travelInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'travel' && obj.contact_id == contactId;
      else
        return obj.type == 'travel' && obj.lead_id == leadId;
    });
    this.criticalInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'critical' && obj.contact_id == contactId;
      else
        return obj.type == 'critical' && obj.lead_id == leadId;
    });

    this.curLifeInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'life' && obj.date_delivered != '' && obj.contact_id == contactId;
      else
        return obj.type == 'life' && obj.date_delivered != '' && obj.lead_id == leadId;
    });
    this.curDisabilityInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'disability' && obj.date_delivered != '' && obj.contact_id == contactId;
      else
        return obj.type == 'disability' && obj.date_delivered != '' && obj.lead_id == leadId;
    });
    this.curLongTermInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'longtermcare' && obj.date_delivered != '' && obj.contact_id == contactId;
      else
        return obj.type == 'longtermcare' && obj.date_delivered != '' && obj.lead_id == leadId;
    });
    this.curTravelInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'travel' && obj.date_delivered != '' && obj.contact_id == contactId;
      else
        return obj.type == 'travel' && obj.date_delivered != '' && obj.lead_id == leadId;
    });
    this.curCriticalInsurance = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'critical' && obj.date_delivered != '' && obj.contact_id == contactId;
      else
        return obj.type == 'critical' && obj.date_delivered != '' && obj.lead_id == leadId;
    });

    this.penLifeInsurance = _.filter(this.insurances, function(obj){
      return obj.type == 'life' && obj.date_delivered == '';
    });
    this.penDisabilityInsurance = _.filter(this.insurances, function(obj){
      return obj.type == 'disability' && obj.date_delivered == '';
    });
    this.penLongTermInsurance = _.filter(this.insurances, function(obj){
      return obj.type == 'longtermcare' && obj.date_delivered == '';
    });
    this.penTravelInsurance = _.filter(this.insurances, function(obj){
      return obj.type == 'travel' && obj.date_delivered == '';
    });
    this.penCriticalInsurance = _.filter(this.insurances, function(obj){
      return obj.type == 'critical' && obj.date_delivered == '';
    });
  }

  sumPayment(type: string) {
    let sum: any;
    switch(type) {
      case 'life':
        sum = this.appGlobal.priceFormat(_.round(_.sumBy(this.lifeInsurance, function(obj) {
          return obj ? obj.details.data.monthly_payment : 0;
        }), 2));
      break;
      case 'disability':
        sum = this.appGlobal.priceFormat(_.round(_.sumBy(this.disabilityInsurance, function(obj) {
          return obj ? obj.details.data.monthly_payment : 0;
        }), 2));
      break;
      case 'longtermcare':
        sum = this.appGlobal.priceFormat(_.round(_.sumBy(this.longTermInsurance, function(obj) {
          return obj ? obj.details.data.monthly_payment : 0;
        }), 2));
      break;
      case 'critical':
        sum = this.appGlobal.priceFormat(_.round(_.sumBy(this.criticalInsurance, function(obj) {
          return obj ? obj.details.data.monthly_payment : 0;
        }), 2));
      break;
      case 'travel':
        sum = this.appGlobal.priceFormat(_.round(_.sumBy(this.travelInsurance, function(obj) {
          return obj ? obj.details.data.monthly_payment : 0;
        }), 2));
      break;
      default:

      break;
    }
    return sum;
  }

  changeContact() {
    if(this.contact.id) {
      this.isLead = false;
    } else {
      this.isLead = true;
    }
    this.getAllInsurance();
    this.getGraphicData();
    this.initAnimatedInsurances();
  }

  goInsurance(type: string) {
    // this.navCtrl.push(InsurancePage, {type: type, allInsurances: this.insurances, contacts: this.contacts, isLead: this.isLead, contact: this.contact});
  }

  openContactList() {
    this.contactListSelect.open();
  }

  lastActiveDate(policy: any) {
    let dateArr = _.compact([policy.date_sold, policy.date_entered, policy.date_sent, policy.date_processed, policy.date_received, policy.date_delivered, policy.date_paid]);
    let moments = dateArr.map(d => moment(d)), maxDate = moment.max(moments);
    return maxDate.format('MM/DD/YYYY');
  }

  goPolicy(policy: any) {
    // this.navCtrl.push(PolicyPage, {policy: policy});
  }

  goPending() {
    this.policiesStatus = 'pending';
  }
}
