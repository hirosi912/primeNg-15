import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { AuthActions } from './core/auth/actions';
import { actionSettingsChangeSideExpand } from './core/settings/settings.actions';
import * as fromQualRun from 'src/app/features/qual-run/models';

import {
  routeAnimations,
  selectIsAuthenticated,
  selectSettingsSideExpand,
  selectThemeMode
} from './core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})

export class AppComponent implements OnInit {
  isExpanded!: boolean;

  themeMode$!: Observable<string>;
  isExpanded$!: Observable<boolean>;
  isAuthenticated$!: Observable<boolean>;

  menuItems: MenuItem[] = [];
  mainItems: MenuItem[] = [
    {
      label: 'menu.manufacturing process',
      icon: 'pi pi-th-large',
      items: [
        {
          label: 'menu.posting',
          routerLink: [''],
          items: [
            {
              label: 'menu.eqp-posting',
              routerLink: ['posting/eqp-posting']
            },
            {
              label: 'menu.lot-posting',
              routerLink: ['posting/lot-posting']
            }            
          ]
        },
      ],
    },
    {
      label: 'menu.analysis report',
      icon: 'pi pi-chart-bar',
      routerLink: ['report'],
      items: []
    },
    {
      label: 'settings',
      icon: 'pi pi-cog',
      routerLink: ['settings']
    }
  ];

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateMenu();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initAuthFlow());

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.themeMode$ = this.store.pipe(select(selectThemeMode));
    this.isExpanded$ = this.store.pipe(select(selectSettingsSideExpand));
    this.isExpanded$.subscribe((check: boolean) => {
      this.isExpanded = check;
    })
  }

  onMenuButtonClick(event: any) {
    this.isExpanded = !this.isExpanded;
    this.store.dispatch(actionSettingsChangeSideExpand({ sideExpand: this.isExpanded }));
    event.preventDefault();
  }

  // translate menu for primeng
  translateMenu() {
    this.menuItems = [];
    this.mainItems.forEach((item) => {
        this.menuItems.push({
          label: item.label,
          icon: item.icon,
          routerLink: item.routerLink,
          items: item.items
        })
    });
    this.menuItems.map(item => {
      item.label = this.translateService.instant(item.label || '')
      item.items?.map(subitem => { 
        subitem.label = this.translateService.instant(subitem.label || '') 
        subitem.items?.map(thritem => { thritem.label = this.translateService.instant(thritem.label || '')  })
      })
    });
  }
}
