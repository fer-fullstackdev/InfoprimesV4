import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public lang: string;
  public userID: string;
  public leadIds: Array<any> = [];
  public leadId: string;
  public userData: any;
  public mainData: any;
  public coapplicantData: any;
  public otherData: any;
  public mortgageData: any;
  public externalData: any;

  constructor(public translate: TranslateService,
              private storage: Storage
    ) {
    this.init();
  }

  init() {
  }

  setLang(lang: string) {
    this.lang = (lang == 'french') ? 'fr' : 'en';
    this.translate.setDefaultLang(this.lang);
  }

  setUserLeadId(leadId, leadIdArr) {
    this.leadId = leadId;
    this.leadIds = leadIdArr;
    this.storage.set('leadId', leadId);
    this.storage.set('leadIdArr', JSON.stringify(leadIdArr));
  }
}
