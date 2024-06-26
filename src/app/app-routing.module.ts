import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SmartContractCardComponent} from './components/smart-contract-card/smart-contract-card.component';
import { FraudTransactionsCardComponent } from './components/fraud-transactions-card/fraud-transactions-card.component';
import { DocumentationComponent} from './components/documentation/documentation.component';
import { SupportComponent} from './components/support/support.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FullComponent } from './components/layouts/full/full.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnalysisHistoryComponent } from './components/analysis-history/analysis-history.component';
import { FraudAnalysisHistoryComponent } from './components/fraud-analysis-history/fraud-analysis-history.component';
import { FraudTransactionsCardAvalancheComponent } from './components/fraud-transactions-card-avalanche/fraud-transactions-card-avalanche.component';
import { FraudTransactionsHistoryAvalancheComponent } from './components/fraud-transactions-history-avalanche/fraud-transactions-history-avalanche.component';
import { FraudTransactionsCardPolygonComponent } from './components/fraud-transactions-card-polygon/fraud-transactions-card-polygon.component';
import { FraudTransactionsHistoryPolygonComponent } from './components/fraud-transactions-history-polygon/fraud-transactions-history-polygon.component';
//import { DashboardTemplateDashboardComponent } from './components/dashboard_template/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'smart-contracts', component: SmartContractCardComponent },
  { path: 'fraud-transactions', component: FraudTransactionsCardComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'support', component: SupportComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'full',  component: FullComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'analysis-history', component: AnalysisHistoryComponent},
  { path: 'fraud-analysis-history', component: FraudAnalysisHistoryComponent },
  { path: 'fraud-transactions-avalanche', component: FraudTransactionsCardAvalancheComponent },
  { path: 'fraud-analysis-history-avalanche', component: FraudTransactionsHistoryAvalancheComponent },
  { path: 'fraud-transactions-polygon', component: FraudTransactionsCardPolygonComponent },
  { path: 'fraud-analysis-history-polygon', component: FraudTransactionsHistoryPolygonComponent },

  // Lazy-loaded routes
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'component',
    loadChildren: () => import('./components/component/component.module').then(m => m.ComponentsModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
