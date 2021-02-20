import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVisitDialogComponent } from '../../component/add-visit-dialog/add-visit-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClinicsService, IClinic, VisitsService } from 'src/swagger/generated/veterinary-clinic-api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clinic-dashboard',
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.sass']
})
export class ClinicDashboardComponent implements OnInit, OnDestroy {

  public clinics: IClinic[];
  private _clinicsSubscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _clinicsService: ClinicsService,
    private _visitsService: VisitsService
  ) {}

  public ngOnInit(): void {
    this._clinicsSubscription = this._clinicsService.clinicsGet().subscribe(clinics => this.clinics = clinics);
  }

  public ngOnDestroy(): void {
    if (this._clinicsSubscription) {
      this._clinicsSubscription.unsubscribe();
    }
  }

  public onSelect(clinic: IClinic){
    this.openDialog(clinic);
  }

  private openDialog(clinic: IClinic) {
    const dialogRef = this._dialog.open(AddVisitDialogComponent, {
      panelClass: 'visit-dialog-container',
      minHeight: 480,
      data: {clinic}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._visitsService.visitsPost(result).toPromise()
          .then(() => this.openSnackBar(true))
          .catch(() => this.openSnackBar(false));
      }
    });
  }

  private openSnackBar(success: boolean): void {
    this._translateService.get(
      ['CLINICS.SNACKBAR.SENT_SUCCESS', 'CLINICS.SNACKBAR.SENT_ERROR', 'CLINICS.SNACKBAR.CLOSE']
    ).subscribe(translation => {
      this._snackBar.open(success ? translation['CLINICS.SNACKBAR.SENT_SUCCESS'] : translation['CLINICS.SNACKBAR.SENT_ERROR'], translation['CLINICS.SNACKBAR.CLOSE'],
      {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
  }

}
