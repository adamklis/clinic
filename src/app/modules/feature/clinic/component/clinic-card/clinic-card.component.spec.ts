import { MatCardModule } from '@angular/material/card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ClinicCardComponent } from './clinic-card.component';

describe('ClinicCardComponent', () => {
  let component: ClinicCardComponent;
  let fixture: ComponentFixture<ClinicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatCardModule
      ],
      declarations: [ ClinicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicCardComponent);
    component = fixture.componentInstance;
    component.clinic = {
      name: 'clinic name',
      description: 'clinic description',
      address: {city: 'city', street: 'street', number: 'number'},
      rating: { value: 5 }};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
