import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, Slides, ModalController } from '@ionic/angular';
import { Http, Headers } from '@angular/http';

import { ConfirmationPage } from '../confirmation/confirmation.page';
import { ProfileEditPage } from '../profile-edit/profile-edit.page';
import { MortgageLoanEditPage } from '../mortgage-loan-edit/mortgage-loan-edit.page';
import { InsuranceInvestEditPage } from '../insurance-invest-edit/insurance-invest-edit.page';
import { AssetsEditPage } from '../assets-edit/assets-edit.page';
import { ProfessionEditPage } from '../profession-edit/profession-edit.page';
import { LiabilitiesEditPage } from '../liabilities-edit/liabilities-edit.page';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

import * as _ from 'lodash';
import { ApiService } from '../../services/api/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-review',
  templateUrl: './profile-review.page.html',
  styleUrls: ['./profile-review.page.scss'],
})
export class ProfileReviewPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  public slideNum: any = 0;
  public isClickedMainPro: boolean = false;
  public isClickedCoapplicantPro: boolean = false;
  public isClickedMainAssets: boolean = true;
  public isClickedCoapplicantAssets: boolean = false;
  public liabilitiesClickedItems: Object = {
    main_loan: false,
    main_commercial: false,
    main_lease: false,
    main_creditcard: false,
    main_other: false,
    other_loan: false,
    other_commercial: false,
    other_lease: false,
    other_creditcard: false,
    other_other: false
  };
  public slideIndexArr: any;
  public item: any = {};
  public mainData: any;
  public mainAssetData: any;
  public coAssetData: any;
  public otherData: any;
  public coapplicantData: any;
  public mortgageData: any;
  public externalData: any;
  private headers: Headers;
  public curHouseholdItem: any = {};
  public curMortgagesItem: any = {};
  public curExternalItem: any = {};
  public mainAssetsTotal: any;
  public coapplicantAssetsTotal: any;
  public editAssetIndex: number;

  public allData: any;
  public contacts: any;
  public mainContact: any;
  public spouseProfile: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private http: Http,
              public apiService: ApiService,
              public appGlobal: AppGlobals,
              public userService: UserService,
              private _elementRef : ElementRef,
              public translate: TranslateService) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.item.liabilitiesArrowIcon = 'arrow-down';
    this.slideIndexArr = [7, 8, 9, 10, 11, 12];

    this.contacts = this.userService.userData.contacts.data;

    this.getData();
    this.mainAssetData = [];
    this.coAssetData = [];
  }

  ngOnInit() {
    //this.keyboard.hideKeyboardAccessoryBar(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileReviewPage');
    this.slides.lockSwipes(true)
  }

  ngAfterViewInit() {
    this.slides.centeredSlides = true;
    this.slides.slidesPerView = 1.06;
    this.slides.spaceBetween = -10;
  }

  setAssetData(category, data) {
    const array = [
      {
        label: 'INSURANCE_REV.MONEY_IN_DA_BANK',
        key: 'base',
        price: data.base
      },
      {
        label: 'INSURANCE_REV.FIXED_TERM_DEPOSIT',
        key: 'term_deposit',
        price: data.term_deposit
      },
      {
        label: 'INSURANCE_REV.NON_REGISTERED_INVESTMENTS',
        key: 'unregistered',
        price: data.unregistered
      },
      {
        label: 'INSURANCE_REV.TFSA',
        key: 'celi',
        price: data.celi
      },
      {
        label: 'INSURANCE_REV.RRSP',
        key: 'reer',
        price: data.reer
      },
      {
        label: 'INSURANCE_REV.RRSP_LIRA',
        key: 'reer_cri',
        price: data.reer_cri
      },
      {
        label: 'INSURANCE_REV.RRIF_LIF',
        key: 'ferr',
        price: data.ferr
      },
      {
        label: 'INSURANCE_REV.RESP',
        key: 'reee',
        price: data.reee
      },
      {
        label: 'INSURANCE_REV.PENSION_FUND',
        key: 'pension',
        price: data.pension
      },
      {
        label: 'INSURANCE_REV.OUTSIDE_INDIVIDUAL_LIFE',
        key: 'individual_life_other',
        price: data.individual_life_other
      },
      {
        label: 'INSURANCE_REV.OUTSIDE_GROUP_LIFE',
        key: 'collective_life_other',
        price: data.collective_life_other
      },
      {
        label: 'INSURANCE_REV.SECOND_VEHICLE',
        key: 'vehicle',
        price: data.vehicle
      },
      {
        label: 'INSURANCE_REV.TOOLS_COLLECTIONS',
        key: 'tools',
        price: data.tools
      },
      {
        label: 'INSURANCE_REV.LAND',
        key: 'land',
        price: data.land
      },
      {
        label: 'INSURANCE_REV.CABINS',
        key: 'cottage',
        price: data.cottage
      },
      {
        label: 'INSURANCE_REV.BUILDINGS',
        key: 'real_state',
        price: data.real_state
      },
      {
        label: 'INSURANCE_REV.OTHER',
        key: 'others',
        price: data.others
      },
    ]
    if(category === 'main') {
      this.mainAssetData = array;
    } else {
      this.coAssetData = array;
    }
  }

  getData() {
    /** Insurance_Review__MAIN_CONTACT_DATA_.js */
    this.mainData = this.userService.mainData;
    this.mainAssetData = this.mainData.asset.data;
    this.setAssetData('main', this.mainAssetData);
    this.mainContact = _.find(this.contacts, {role: 'main', lead_id: this.mainData.lead_id});
    this.mainAssetsTotal = _.sum([this.mainData.asset.data.base, this.mainData.asset.data.term_deposit, this.mainData.asset.data.unregistered, this.mainData.asset.data.celi, this.mainData.asset.data.reer, this.mainData.asset.data.reer_cri, this.mainData.asset.data.ferr, this.mainData.asset.data.reee, this.mainData.asset.data.pension, this.mainData.asset.data.individual_life_other, this.mainData.asset.data.collective_life_other, this.mainData.asset.data.vehicle, this.mainData.asset.data.tools, this.mainData.asset.data.land, this.mainData.asset.data.cottage, this.mainData.asset.data.real_state, this.mainData.asset.data.others]);

    /** Coapplicant_Insurance_review_data.js */
    this.coapplicantData = this.userService.coapplicantData;
    this.coAssetData = this.coapplicantData.asset.data;
    this.setAssetData('co', this.coAssetData);
    this.coapplicantAssetsTotal = _.sum([this.coapplicantData.asset.data.base, this.coapplicantData.asset.data.term_deposit, this.coapplicantData.asset.data.unregistered, this.coapplicantData.asset.data.celi, this.coapplicantData.asset.data.reer, this.coapplicantData.asset.data.reer_cri, this.coapplicantData.asset.data.ferr, this.coapplicantData.asset.data.reee, this.coapplicantData.asset.data.pension, this.coapplicantData.asset.data.individual_life_other, this.coapplicantData.asset.data.collective_life_other, this.coapplicantData.asset.data.vehicle, this.coapplicantData.asset.data.tools, this.coapplicantData.asset.data.land, this.coapplicantData.asset.data.cottage, this.coapplicantData.asset.data.real_state, this.coapplicantData.asset.data.others]);

    /** Other_Insurance_review_Data.js */
    this.otherData = this.userService.otherData;
    this.spouseProfile = _.find(this.contacts, {role: 'coapplicant'});

    /** Mortgages_DATA.js */
    this.mortgageData = this.userService.mortgageData;
    if(this.mortgageData.length > 0) this.curMortgagesItem = this.mortgageData[0]

    /** External_Insurance_Data.js */
    this.externalData = this.userService.externalData;
  }

  goBack() {
    this.navCtrl.pop();
  }

  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    if(this.slideNum >= 6) {
      this.navCtrl.push(ConfirmationPage);
    }
  }

  previous() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  slideChanged() {
    this.slideNum = this.slides.getActiveIndex();
    // if(this.slideNum == 6) {
    //   this.slides.lockSwipeToNext(true);
    // } else {
    //   this.slides.lockSwipeToNext(false);
    // }
    this.getSlideIndexArr(this.slideNum + 1);
  }

  householdItemClick(item: any) {
    if(this.curHouseholdItem.id == item.id) {
      this.curHouseholdItem = {};
    } else {
      this.curHouseholdItem = item;
    }
  }

  professionItemClick(type: string) {
    if(type == 'main') {
      this.isClickedMainPro = !this.isClickedMainPro;
      if(this.isClickedMainPro) this.isClickedCoapplicantPro = false
    } else {
      this.isClickedCoapplicantPro = !this.isClickedCoapplicantPro;
      if(this.isClickedCoapplicantPro) this.isClickedMainPro = false
    }
  }

  mortgageLoanItemClick(item: any) {
    if(this.curMortgagesItem.id == item.id) {
      this.curMortgagesItem = {};
    } else {
      this.curMortgagesItem = item;
    }
  }

  liabilitiesItemClick(cate: string) {
    const temp = this.liabilitiesClickedItems[cate];
    this.liabilitiesClickedItems = {
      main_loan: false,
      main_commercial: false,
      main_lease: false,
      main_creditcard: false,
      main_other: false,
      other_loan: false,
      other_commercial: false,
      other_lease: false,
      other_creditcard: false,
      other_other: false
    };
    this.liabilitiesClickedItems[cate] = !temp;
  }

  externalItemClick(item: any) {
    if(this.curExternalItem.id == item.id) {
      this.curExternalItem = {};
    } else {
      this.curExternalItem = item;
    }
  }

  assetsItemClick(type: string) {
    if(type == 'main') {
      this.isClickedMainAssets = !this.isClickedMainAssets;
      if(this.isClickedMainAssets) this.isClickedCoapplicantAssets = false;
    } else {
      this.isClickedCoapplicantAssets = !this.isClickedCoapplicantAssets;
      if(this.isClickedCoapplicantAssets) this.isClickedMainAssets = false;
    }
  }

  goProfileEdit(type: string, action: string, data: any) {
    let profileModal = this.modalCtrl.create(ProfileEditPage, {type: type, action: action, data});
    profileModal.present();
  }

  goMortgageLoanEdit(action: string, data: Object) {
    let mortgageLoanModal = this.modalCtrl.create(MortgageLoanEditPage, {action: action, data: data});
    mortgageLoanModal.present();
  }

  goInsuranceInvestEdit(action: string, data: any) {
    let insuranceInvestModal = this.modalCtrl.create(InsuranceInvestEditPage, {action: action, data: data});
    insuranceInvestModal.present();
  }

  onChange(category, option, event) {
    console.log(category + ',' + option.key, event);
  }

  toggleToCoAssets() {
    this.isClickedMainAssets = false;
    this.isClickedCoapplicantAssets = true;
    this._elementRef.nativeElement.querySelector('.assets-card').scrollTop = 0;
  }

  toggleToMainAssets() {
    this.isClickedMainAssets = true;
    this.isClickedCoapplicantAssets = false;
    this._elementRef.nativeElement.querySelector('.assets-card').scrollTop = 0;
  }

  goAssetsEdit(action: string, data: Object) {
    let assetsModal = this.modalCtrl.create(AssetsEditPage, {action: action, data: data});
    assetsModal.present();
  }

  goProfessionEdit(data: any) {
    let professionModal = this.modalCtrl.create(ProfessionEditPage, {data: data});
    professionModal.present();
  }

  openLiabilitiesEdit(data: any, type: string, index: number) {
    let liabilitiesModal = this.modalCtrl.create(LiabilitiesEditPage, {data: data, type: type, index: index});
    liabilitiesModal.present();
  }

  getSlideIndexArr(index: any) {
    let startIndex = 8 - index;
    this.slideIndexArr = [];
    for(let i = 0; i < 6; i++) {
      this.slideIndexArr.push(startIndex + i);
    }
  }

  isInSlideIndexArr(index) {
    return _.includes(this.slideIndexArr, index);
  }

  getBorrowwers(data: any) {
    let titulaire = JSON.parse(data.titulaire);
    let nameStr = '';
    if(this.mainData.id == titulaire[0] || this.mainData.id == titulaire[1]) {
      nameStr = this.mainData.firstname + ' ' + this.mainData.lastname;
    }
    if(this.coapplicantData.id == titulaire[0] || this.coapplicantData.id == titulaire[1]) {
      nameStr = nameStr + ', ' + this.coapplicantData.firstname + ' ' + this.coapplicantData.lastname;
    }
    return nameStr;
  }

  getInsuredLength(insured: string) {
    return JSON.parse(insured).length;
  }

  getExternalInsuranceTypes(type: string) {
    var typeStr;
    switch(type) {
      case 'life':
        this.translate.get('GENERIC.LIFE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'disability':
        this.translate.get('GENERIC.DISABILITY', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'critical':
        this.translate.get('GENERIC.CRITICAL', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'mortgage':
        this.translate.get('GENERIC.MORTGAGE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'collective-life':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.LIFE', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'collective-critical':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.CRITICAL', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'collective-disability':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.DISABILITY', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'reee':
        this.translate.get('INSURANCE_REV.REEE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'reer':
        this.translate.get('INSURANCE_REV.RRSP', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'celi':
        this.translate.get('INSURANCE_REV.TFSA', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'investment':
        this.translate.get('INSURANCE_REV.INVESTMENT', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      default:

      break;
    }
    return typeStr;
  }
}
