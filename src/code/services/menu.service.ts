import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    menu: any[] = [];

    constructor() { }

    setMenu() {
        this.menu = [
            {
                label: 'menu.manufacturing process',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'menu.posting',
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
                label: 'settings',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'menu.general',
                        routerLink: ['settings/general']
                    },
                    {
                        label: 'menu.resource',
                        routerLink: ['settings/resource']
                    }
                ]
            }
        ];

        return this.menu;
    }
}
