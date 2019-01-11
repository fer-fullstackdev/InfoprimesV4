import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home/home';
import { BrokerPage } from './pages/broker/broker';
import { ProfileEditPage } from './pages/profile-edit/profile-edit';
import { MyProfilePage } from './pages/my-profile/my-profile';
import { ReclamationPage } from './pages/reclamation/reclamation';
import { TabsPage } from './pages/tabs/tabs';
import { LoginPage } from './pages/login/login';
import { InsurancePage } from './pages/insurance/insurance';
import { PolicyPage } from './pages/policy/policy';
import { PolicyStatusPage } from './pages/policy-status/policy-status';
import { HouseholdProfilePage } from './pages/household-profile/household-profile';
import { MyPoliciesPage } from './pages/my-policies/my-policies';
import { PaperworkPage } from './pages/paperwork/paperwork';
import { SettingPage } from './pages/setting/setting';
import { HouseholdProfilesPage } from './pages/household-profiles/household-profiles';
import { ProfileReviewPage } from './pages/profile-review/profile-review';
import { ConfirmationPage } from './pages/confirmation/confirmation';
import { MortgageLoanEditPage } from './pages/mortgage-loan-edit/mortgage-loan-edit';
import { InsuranceInvestEditPage } from './pages/insurance-invest-edit/insurance-invest-edit';
import { AssetsEditPage } from './pages/assets-edit/assets-edit';
import { ProfessionEditPage } from './pages/profession-edit/profession-edit';
import { LiabilitiesEditPage } from './pages/liabilities-edit/liabilities-edit';
import { RegisterPage } from './pages/register/register';
import { ResetPasswordPage } from './pages/reset-password/reset-password';
import { ResetpasswordConfirmPage } from './pages/resetpassword-confirm/resetpassword-confirm';
import { TouchidPage } from './pages/touchid/touchid';
import { PasscodePage } from './pages/passcode/passcode';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
  // { path: 'home', component: HomePage },
  // { path: 'broker', component: BrokerPage },
  // { path: 'profile-edit', component: ProfileEditPage },
  // { path: 'my-profile', component: MyProfilePage },
  // { path: 'reclamation', component: ReclamationPage },
  // { path: 'tabs', component: TabsPage },
  // { path: 'login', component: LoginPage },
  // { path: 'insurance', component: InsurancePage },
  // { path: 'policy', component: PolicyPage },
  // { path: 'household-profile', component: HouseholdProfilePage },
  // { path: 'my-policies', component: MyPoliciesPage },
  // { path: 'paperwork', component: PaperworkPage },
  // { path: 'setting', component: SettingPage },
  // { path: 'household-profiles', component: HouseholdProfilesPage },
  // { path: 'profile-review', component: ProfileReviewPage },
  // { path: 'confirmation', component: ConfirmationPage },
  // { path: 'mortgage-loan-edit', component: MortgageLoanEditPage },
  // { path: 'insurance-invest-edit', component: InsuranceInvestEditPage },
  // { path: 'assets-edit', component: AssetsEditPage },
  // { path: 'profession-edit', component: ProfessionEditPage },
  // { path: 'liabilities-edit', component: LiabilitiesEditPage },
  // { path: 'register', component: RegisterPage },
  // { path: 'reset-password', component: ResetPasswordPage },
  // { path: 'resetpassword-confirm', component: ResetpasswordConfirmPage },
  // { path: 'touchid', component: TouchidPage },
  // { path: 'passcode', component: PasscodePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
