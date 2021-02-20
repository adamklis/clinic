import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicDashboardComponent } from './container/clinic-dashboard/clinic-dashboard.component';


const routes: Routes = [
  {path: '', component: ClinicDashboardComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
