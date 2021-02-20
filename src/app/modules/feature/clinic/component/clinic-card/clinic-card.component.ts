
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IClinic } from 'src/swagger/generated/veterinary-clinic-api';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.sass']
})
export class ClinicCardComponent implements OnInit {

  @Input()
  public clinic: IClinic;

  @Output()
  public selectEvent: EventEmitter<IClinic> = new EventEmitter<IClinic> ();

  constructor() { }

  ngOnInit(): void {
  }

  public onSelect(clinic: IClinic): void{
    this.selectEvent.emit(clinic);
  }

}
