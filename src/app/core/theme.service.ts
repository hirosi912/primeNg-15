import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document) { }

  switchTheme(theme: string, mode: string) {
    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const layoutHref = theme + '-' + mode + '.css';
    layoutLink.href = layoutHref;
  }
}


