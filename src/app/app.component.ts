import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'klinika';

  constructor(
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this._translateService.setDefaultLang('pl');
    this._translateService.use('pl');
  }


}
