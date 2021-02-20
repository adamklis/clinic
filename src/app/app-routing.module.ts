import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'clinics', loadChildren: () => import('./modules/feature/clinic/clinic.module').then(m => m.ClinicModule)},
  {path: '', redirectTo: 'clinics', pathMatch: 'full'},
  {path: '**', redirectTo: 'clinics'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
