
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IClinic, AnimalSpeciesService, VisitTypesService, IVisit } from 'src/swagger/generated/veterinary-clinic-api';

@Component({
  selector: 'app-add-visit-dialog',
  templateUrl: './add-visit-dialog.component.html',
  styleUrls: ['./add-visit-dialog.component.sass']
})
export class AddVisitDialogComponent implements OnInit, OnDestroy {

  public animalSpecies: string[];
  private _animalSpeciesSubscription: Subscription;

  public visitTypes: string[];
  private _visitTypesSubiscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {clinic: IClinic},
    private _dialogRef: MatDialogRef<AddVisitDialogComponent>,
    private _formBuilder: FormBuilder,
    private _animalSpeciesService: AnimalSpeciesService,
    private _visitTypesService: VisitTypesService
  ) { }

  public visitForm = this._formBuilder.group({
    visitType: ['', Validators.required],
    surname: ['', Validators.required],
    forename: ['', Validators.required],
    telephoneNumber: ['', {
      validators: Validators.pattern('^[+][0-9]{1,4}[" "][0-9]{3}[" "][0-9]{3}[" "][0-9]{3}$'),
      updateOn: 'blur'
    }],
    email: ['', [Validators.required, Validators.email]],
    animal: ['', Validators.required],
    rodo: [false, Validators.requiredTrue]
  });

  public confirmClicked = false;

  ngOnInit(): void {
    this._visitTypesSubiscription = this._visitTypesService.visitTypesGet().subscribe(types =>
      this.visitTypes = types.sort((a, b) => a > b ? 1 : -1)
    );
    this._animalSpeciesSubscription = this._animalSpeciesService.animalSpeciesGet().subscribe(species =>
      this.animalSpecies = species.sort((a, b) => a > b ? 1 : -1)
    );
  }

  ngOnDestroy(): void {
    if (this._animalSpeciesSubscription) {
      this._animalSpeciesSubscription.unsubscribe();
    }
  }

  public confirmVisit(event: Event): void{
    event.preventDefault();
    this.confirmClicked = true;
    if (this.visitForm.valid){
      const visit: IVisit = {
        visitType: this.visitForm.value.visitType,
        user: {
          surname: this.visitForm.value.surname,
          forename: this.visitForm.value.forename,
          telephoneNumber: this.visitForm.value.telephoneNumber,
          email: this.visitForm.value.email
        },
        animal: this.visitForm.value.animal,
        clinicUUid: this.data.clinic.uuid
      };
      this._dialogRef.close(visit);
    }
  }

  public formatTelephoneNumber(){
    let telephoneNumber: string = this.visitForm.controls.telephoneNumber.value;
    telephoneNumber = telephoneNumber.replace(/\D/g, '');
    if (telephoneNumber.length === 9){
      telephoneNumber = '48' + telephoneNumber;
    }
    if (telephoneNumber.length >= 10 && telephoneNumber.length <= 13){
      telephoneNumber = [
        telephoneNumber.slice(0, -9),
        telephoneNumber.slice(-9, -6),
        telephoneNumber.slice(-6, -3),
        telephoneNumber.slice(-3)
      ].join(' ');
    }
    telephoneNumber = '+' + telephoneNumber;

    this.visitForm.controls.telephoneNumber.setValue(telephoneNumber);
  }

  public onAnimalInput(event){
    const animal: string = this.visitForm.controls.animal.value;
    if (animal && event.inputType !== 'deleteContentBackward') {
      const foundSpec = this.animalSpecies.find(spec => spec.toLowerCase().startsWith(animal.toLowerCase()));
      if (foundSpec) {
        this.visitForm.controls.animal.setValue(foundSpec);
        event.target.setSelectionRange(animal.length, foundSpec.length);
      }
    }
  }

}
