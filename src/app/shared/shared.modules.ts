import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { UiModule } from './ui.module';

@NgModule({
  declarations: [],
  imports: [
    UiModule
  ],
  exports: [
    UiModule,
    NgrxFormsModule
  ],
})
export class SharedModule { }
