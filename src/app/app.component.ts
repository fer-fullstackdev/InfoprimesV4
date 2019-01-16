import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { ApiService } from './services/api/api.service';
import { UserService } from './services/user/user.service';
import { AppGlobals } from './shared/app.globals';

import { TouchidPage } from './pages/touchid/touchid.page';
import { PasscodePage } from './pages/passcode/passcode.page';
import { ResetpasswordConfirmPage } from './pages/resetpassword-confirm/resetpassword-confirm.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private oneSignal: OneSignal,
    private storage: Storage,
    private apiService: ApiService,
    private touchId: TouchID,
    private modalCtrl: ModalController,
    public appGlobal: AppGlobals,
    private userService: UserService,
    private globalization: Globalization,
    private deeplinks: Deeplinks,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      if (this.platform.is('cordova')) {
        this.initOneSignal();
        this.globalization.getPreferredLanguage()
          .then(res => {
            if(res.value == 'en-US') {
              this.userService.setLang('en');
            }
            else {
              this.userService.setLang('fr');
            }
          })
          .catch(e => { console.log(e); })
      } else {
        this.userService.setLang('en');
      }
      this.checkLogin();

      this.platform.pause.subscribe((() => {
        if(this.platform.is('android')) {
          if(this.appGlobal.preventPauseEV_1 || this.appGlobal.preventPauseEV_2 || this.appGlobal.preventPauseEV_3)
            return;
        }
        this.storage.get('token')
          .then(res => {
            if(res) {
              if(this.appGlobal.isOpenModal || !this.appGlobal.passedAuthPhases) {}
              else {
                this.touchId.isAvailable()
                  .then(
                    (res) => {
                      this.modalCtrl.create({component: TouchidPage, componentProps: {resume: true}})
                        .then((modal) => {
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                        });
                    },
                    (err) => {
                      this.modalCtrl.create({component: PasscodePage, componentProps: {resume: true}})
                        .then((modal) => {
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                        });
                    }
                  );
              }
            }
          })
          .catch(e => { console.log(e); });
      }));

      this.deeplinks.route({
        '/passwordreset/:email/:reset_token': ResetpasswordConfirmPage
        }).subscribe(match => {
          this.navCtrl.navigateRoot('resetpassword-confirm/'+match.$args.email+'/'+match.$args.email);
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, nomatch => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });
    });
  }

  initOneSignal() {
    this.oneSignal.startInit('db339b5c-3370-4758-b208-9d70e61b5d7e', '464172007115');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((res) => {});
    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      if(res.notification.payload.additionalData.type == 'email_verified') {
        this.storage.get('token')
          .then(res => {
            // if(res && this.navCtrl.getActive()) {
            if(res && this.router.url == 'RegisterPage') {
              
              if(!this.appGlobal.isOpenModal) {
                this.touchId.isAvailable()
                  .then(
                    (res) => {
                      this.modalCtrl.create({component: TouchidPage, componentProps: {}})
                        .then((modal) => {
                          modal.present();
                          this.appGlobal.isOpenModal = true;
                        });

                      /*
                      touchIdModal.onWillDismiss(res => {
                        this.nav.setRoot(TabsPage);
                      });
                      */
                    },
                    (err) => {
                      this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                        .then((modal) => {
                          modal.present();
                          this.appGlobal.isOpenModal = true;
                        });
                      
                      /*
                      passcodeModal.onWillDismiss(res => {
                        this.nav.setRoot(TabsPage);
                      });
                      */
                    }
                  );
              } else {
                this.router.navigate(['']);
                // this.nav.setRoot(TabsPage);
              }
              
            }
          })
          .catch(e => { console.log(e); });
      }
    });
    this.oneSignal.endInit();
  }

  checkLogin() {
    this.storage.get('token')
      .then(res => {
        if(!res) {
          this.splashScreen.hide();
          // this.rootPage = ResetpasswordConfirmPage;
          this.router.navigateByUrl('/login')
        } else {
          this.apiService.get1('/auth/token/refresh', '' , res)
            .subscribe((res) => {
              let authStr = res.headers.get('Authorization');
              let arr = authStr.split('Bearer ');
              let refreshToken = arr[1];
              this.apiService.get1('/auth/user', '', refreshToken)
                .subscribe((res) => {
                  this.splashScreen.hide();

                  let authStr = res.headers.get('Authorization');
                  let arr = authStr.split('Bearer ');
                  let sentEmail = res.body.client.email;
                  this.storage.set('token', arr[1]);
                  this.userService.userID = res.body.client.id;
                  if(res.body.client.active) {
                    this.touchId.isAvailable()
                      .then(
                        (res) => {
                          this.modalCtrl.create({component: TouchidPage, componentProps: {}})
                            .then((modal) => {
                              modal.present();
                              this.appGlobal.isOpenModal = true;
                            });

                          /*
                          touchIdModal.onWillDismiss(res => {
                            this.nav.setRoot(TabsPage);
                          });
                          */
                        },
                        (err) => {
                          this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                            .then((modal) => {
                              modal.onWillDismiss().then((res) => {
                                this.router.navigateByUrl('/tabs');
                              });
                              modal.present().then((res) => {
                                this.appGlobal.isOpenModal = true;
                              });
                            });
                        }
                      );
                  } else {
                    this.router.navigateByUrl('RegisterPage/true/true/'+sentEmail);
                    // this.nav.setRoot(RegisterPage, {registered: true, fromAppStart: true, sentEmail: sentEmail});
                  }
                },
                (e) => {
                  console.log(e);
                  this.splashScreen.hide();

                  this.storage.remove('token');
                  this.router.navigateByUrl('/login');
                  // this.rootPage = LoginPage;
                });
            },
            (e) => {
              console.log(e);
              this.splashScreen.hide();
              this.storage.remove('token');
              this.router.navigateByUrl('/login');
              // this.rootPage = LoginPage;
            });
        }
      })
      .catch(e => { this.splashScreen.hide(); console.log(e); });
  }
}
