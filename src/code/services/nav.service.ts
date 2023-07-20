import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
// import { Store } from '@ngrx/store';

// import { AppState } from '../core.module';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
// import { actionSettingsChangeNavs } from '../settings/settings.actions';

export interface Nav {
    label: string;
    routerLink: string;
}

@Injectable({
    providedIn: 'root'
})
export class NavService {
    navs: Nav[] = [];
    public navsChange = new BehaviorSubject(this.navs);
    navsChange$ = this.navsChange.asObservable();

    constructor(
        // private store: Store<AppState>,
        private localStorageService: LocalStorageService,
        private router: Router
    ) {

    }

    setNavs(
        snapshot: ActivatedRouteSnapshot,
        lazyTranslateService?: TranslateService
    ) {
        let lastChild = snapshot;
        while (lastChild.children.length) {
            lastChild = lastChild.children[0];
        }
        this.navs = this.localStorageService.getItem('Navs') ? this.localStorageService.getItem('Navs') : [{
            label: 'home',
            routerLink: '/home'
        }];
        if (this.navs) {
            let index = true;
            this.navs.forEach(item => {
                if (item.routerLink === this.router.url.split('?')[0]) {
                    index = false;
                }
            });

            if (index) {
                this.navs.push({
                    label: lastChild.data['title'],
                    routerLink: this.router.url
                });
            }
            this.localStorageService.setItem('Navs', this.navs);
        }
        this.navsChange.next(this.navs);
    }
}
