import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Option, EqpFilterState } from '@app/features/posting/models';
import { Store } from '@ngrx/store';
import { catchError, throwError, map, Observable, of } from 'rxjs';

import {
  actionFilterUpdate,
} from 'src/app/features/posting/containers/eqp-posting/eqp-posting.actions';
import {
  selectEqpPostingFilter
} from 'src/app/features/posting/containers/eqp-posting/eqp-posting.selectors';
import { EqpService } from 'src/app/shared/services/eqp.service';

@Component({
  selector: 'app-eqp-filter',
  templateUrl: './eqp-filter.component.html',
  styleUrls: ['./eqp-filter.component.scss']
})

export class EqpFilterComponent implements OnInit {
  form!: FormGroup;
  facilities: Option[] = [];
  areas: Option[] = [];
  steps: Option[] = [];
  filter = {
    facility: {},
    area: {},
    step: {}
  };
  filter$: Observable<EqpFilterState> | undefined;
  // facilities$: Observable<Option[]> | undefined;
  // areas$: Observable<Option[]> | undefined;
  initArea = {}
  // steps$: Observable<Option[]> | undefined;
  initStep = {}

  constructor(
    private eqpService: EqpService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.filter$ = this.store.select(selectEqpPostingFilter);
    // filters state
    this.filter$.pipe().subscribe((item) => {
      this.filter = item;
    });

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      facility: new FormControl(null),
      area: new FormControl(null),
      step: new FormControl(null)
    })

    // get facilities options
    this.eqpService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res;
      },
      error: (err) => {
        console.error(err);
      }
    })

    // Facility change
    this.form.get("facility")?.valueChanges.subscribe(item => {
      if (item) {
        this.setAreas(item)
        if (Object.keys(this.initArea).length > 0) {
          this.filter = { ...this.filter, facility: item }
          this.initArea = {}
        } else {
          this.filter = { ...this.filter, facility: item, area: {}, step: {} }
        }
        this.store.dispatch(actionFilterUpdate({ filter: this.filter }));
      }
    });

    // Area change
    this.form.get("area")?.valueChanges.subscribe(item => {
      if (item) {
        this.setSteps(item);
        if (Object.keys(this.initStep).length > 0) {
          this.filter = { ...this.filter, area: item }
          this.initStep = {}
        } else {
          this.filter = { ...this.filter, area: item, step: {} }
        }
      } else {
        this.steps = [];
        this.filter = { ...this.filter, area: {}, step: {} }
      }
      this.store.dispatch(actionFilterUpdate({ filter: this.filter }));
    });

    // Step change
    this.form.get("step")?.valueChanges.subscribe(item => {
      this.filter = { ...this.filter, step: item ? item : {} }
      this.store.dispatch(actionFilterUpdate({ filter: this.filter }));
    });

    // Initial state
    if (Object.keys(this.filter.facility).length > 0) {
      if (Object.keys(this.filter.area).length > 0) {
        this.initArea = this.filter.area;
        if (Object.keys(this.filter.step).length > 0) {
          this.initStep = this.filter.step;
        }
      }
      this.form.get("facility")?.setValue(this.filter.facility);
    }
    if (Object.keys(this.filter.area).length > 0) {
      this.form.get("area")?.setValue(this.filter.area);
    }
    if (Object.keys(this.filter.step).length > 0) {
      this.form.get("step")?.setValue(this.filter.step);
    }
  }

  setAreas(item: any) {
    this.eqpService.GetAreasFormFacility(item.value).subscribe({
      next: (res) => {
        this.areas = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  setSteps(item: any) {
    this.eqpService.GetStepsFormArea(item.value).subscribe((res: any) => {
      this.steps = res;
    }, (err: Error) => {
      console.error(err);
    })
  }

  reset() {
    this.store.dispatch(actionFilterUpdate({ filter: { facility: {}, area: {}, step: {} } }));
    this.form.reset();
  }
}
