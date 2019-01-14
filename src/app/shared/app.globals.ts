import { Injectable } from '@angular/core';

import { UserService } from '../services/user/user.service';

import * as moment from 'moment';
import * as numeral from 'numeral';
import * as $ from 'jquery';

@Injectable()
export class AppGlobals {
  private minYear = 1930;
  private maxYear = moment().year() + 20;
  public liability_types = ['', 'INSURANCE_REV.PERSONAL_LOANS', 'INSURANCE_REV.BUSINESS_LOANS', 'INSURANCE_REV.VEHICLE_LOANS', 'INSURANCE_REV.CREDIT_CARDS', 'INSURANCE_REV.OTHER_DEBTS']
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public years = [];
  public days = [];
  public isOpenModal: boolean = false;
  public passedAuthPhases: boolean = false;
  public preventPauseEV_1: boolean = false;
  public preventPauseEV_2: boolean = false;
  public preventPauseEV_3: boolean = false;

  constructor(public userService: UserService) {
    this.setYears();
  }

  displayUpdatedNumber(el: any, value: any, max: any) {
    if( value < max ) $(el).html(this.priceFormat(value, 0));
    else $(el).html(this.priceFormat(max, 0));
  }

  setYears() {
    for(let i = this.minYear; i <= this.maxYear; i++) {
      this.years.push(i.toString());
    }
    this.years.reverse();
  }

  getDays(year = '2018', month = '') {
    this.days = [];
    let days: any;
    const m = this.months.indexOf(month) + 1
    if(year && m) {
      days = new Date(Number(year), m, 0).getDate();
    } else {
      days = 31;
    }
    for(let i = 1; i <= days; i++) {
      const day = (i < 10 ? '0' : '') + i.toString();
      this.days.push(day);
    }
    return this.days;
  }

  getPolicyStatus(policy: any) {
    if(policy.status == 'sent' || policy.status == 'received') {
      return 'pending';
    } else if(policy.status == 'delivered' || policy.status == 'modified' || policy.status == 'paid') {
      return 'in force';
    } else if(policy.status == 'refused_client' || policy.status == 'deferred' || policy.status == 'laps' || policy.status == 'laps_to_verify' || policy.status == 'cancelled') {
      return 'canceled';
    } else if(policy.status == 'refused' || policy.status == 'refused_1') {
      return 'refused';
    } else {
      return 'in force';
    }
  }

  dateFormatting(date: string, format: string) {
    return moment(date).locale(this.userService.lang).format(format);
  }

  numberFormating(number: any) {
    if(Number.isInteger(number)) {
      return numeral(number).format('0,0');
    } else {
      return numeral(number).format('0,0.00');
    }
  }

  priceFormat(price: any, decimalCount: Number = 2) {
    if(!price || isNaN(Number(price)) || price < 0) {
      price = 0;
    }
    if(this.userService.lang == 'fr') {
      if(price == 0) return this.numberFormat(price, 0, '.', ',') + ' $';
      return this.numberFormat(price, decimalCount, '.', ',') + ' $';
    } else {
      if(price == 0) return '$ ' + this.numberFormat(price, 0, '.', ',');
      return '$ ' + this.numberFormat(price, decimalCount, '.', ',');
    }
  }

  priceFormatRound(price: any) {
    if(!price || isNaN(Number(price)) || price < 0) {
      price = 0;
    }
    if(this.userService.lang == 'fr') {
      return this.numberFormat(price, 0, '.', ',') + ' $';
    } else {
      return '$ ' + this.numberFormat(price, 0, '.', ',');
    }
  }

  numberFormat(number: any, decimalCount: any, decimalSymbol: any, thousandsSymbol: any) {
    var n = number, dC = isNaN(decimalCount = Math.abs(decimalCount)) ? 2 : decimalCount;
    var dS = decimalSymbol == undefined ? '.' : decimalSymbol;
    var tS = thousandsSymbol == undefined ? ',' : thousandsSymbol, s = n < 0 ? '-' : '';
    let i: any;
    i = parseInt(n = Math.abs(+n || 0).toFixed(dC)) + '';
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? (i.substr(0, j) + tS) : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + tS) + (dC ? dS + Math.abs(n - i).toFixed(dC).slice(2) : '');
  }
}
