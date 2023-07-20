import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private translateService: TranslateService,
    private title: Title
  ) { }

  setTitle(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    const translate = lazyTranslateService || this.translateService;
    if (title) {
      let titleName;
      translate
        .get(title)
        .pipe(filter(translatedTitle => translatedTitle !== title))
        .subscribe(translatedTitle => {
          titleName = translatedTitle;
          this.title.setTitle(`${env.appName} - ${translatedTitle}`);
        });
    } else {
      this.title.setTitle(env.appName);
    }
  }
}


