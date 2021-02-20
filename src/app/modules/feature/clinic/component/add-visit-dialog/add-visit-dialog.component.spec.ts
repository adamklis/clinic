import { MatCardModule } from '@angular/material/card';
import { VisitTypesService } from './../../../../../../swagger/generated/veterinary-clinic-api/api/visit-types.service';
import { AnimalSpeciesService } from './../../../../../../swagger/generated/veterinary-clinic-api/api/animal-species.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AddVisitDialogComponent } from './add-visit-dialog.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AddVisitDialogComponent', () => {
  let component: AddVisitDialogComponent;
  let fixture: ComponentFixture<AddVisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatCardModule
      ],
      declarations: [ AddVisitDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: AnimalSpeciesService, useValue: {animalSpeciesGet: () => of([])} },
        { provide: VisitTypesService, useValue: {visitTypesGet
          : () => of([])} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
