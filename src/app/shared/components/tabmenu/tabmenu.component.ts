import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { AppState, LocalStorageService } from 'src/app/core/core.module'
import { NavsService, Nav } from '@app/core/navs/navs.service'
import { selectSettingsNavs } from 'src/app/core/settings/settings.selectors';
import { SettingsState} from 'src/app/core/settings/settings.model';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss']
})
export class TabmenuComponent {
  tabItems!: MenuItem[];
  navs: Nav[] = [];
  visible: boolean = true;

  navs$: Observable<SettingsState['navs']> | undefined;

  dragIndex!: number;
  currentIndex!: number;
  activeItem!: MenuItem;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private navsService: NavsService,
    private store: Store<AppState>,
  ) {
    // this.navs$ = this.store.select(selectSettingsNavs);

    this.navsService.navsChange$.subscribe(tabItems => {
      this.navs = tabItems
    });
  }

  ngOnInit() { }

  closeTab(event: MouseEvent, item: Nav): void {
    const index = this.navs.indexOf(item)
    if (index >= 0) {
      this.navs.splice(index, 1)
    }
    this.localStorageService.setItem('Navs', this.navs);
    if (item.routerLink === this.router.url) {
      this.router.navigate([this.navs[index - 1].routerLink])
    }
    event.preventDefault()
  }

  onDragStart(event: DragEvent, index: number) {
    this.dragIndex = index
    console.log("drag started", JSON.stringify(event, null, 2))
  }

  onDrop(event: any) {
    let currentIndex = 0
    currentIndex = Number(event.event.target['id'].split('_')[1])

    const newNavs: any = [];
    if (currentIndex > 0 && this.dragIndex > 0) {
      this.navs.forEach((item, i) => {
        if (i == 0) {
          newNavs.push(item)
        }
        if (i > 0) {
          if (i == currentIndex) {
            newNavs.push(this.navs[this.dragIndex]);
          } else {
            if (i < this.dragIndex) {
              if (i < currentIndex) {
                newNavs.push(item)
              } else {
                newNavs.push(this.navs[i - 1])
              }
            } else {
              if (i < currentIndex) {
                newNavs.push(this.navs[i + 1])
              } else {
                if (i == this.dragIndex) {
                  newNavs.push(this.navs[i - 1])
                } else if (i == this.dragIndex) {

                } else {
                  newNavs.push(item)
                }
              }
            }
          }
        }
      })
      this.localStorageService.setItem('Navs', newNavs)
      this.navs = newNavs
    }
  }
}
