import { Direction } from '@angular/cdk/bidi';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'GetPackage';
  lang: string = 'en';

  constructor(
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'he']);
    translate.setDefaultLang('en');
  }

  langChange() {
    this.translate.use(this.lang);
  }

  getDir() : Direction {
    return this.translate.currentLang == 'he' ? 'rtl' : 'ltr';
  }
}
