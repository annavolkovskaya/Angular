import {
  Component
} from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../../../state/main.state';
import { Observable } from 'rxjs';

@Component ({
  selector: 'spinner',
  styleUrls: ['./spinner.component.css'],
  template: `<div class="load-container" *ngIf="isShown">
  <div class="loader">Loading...</div>
  </div>`
})

export class SpinnerComponent {
  public isShown: boolean;

  constructor(private store: Store<State>) {
      Observable.combineLatest(
        store.select('combinedReducer', 'spinnerStoreReducer', 'isSpinnerShown'),
        store.select('combinedReducer', 'coursesStoreReducer', 'isSpinnerShown'),
        (spinner1: boolean, spinner2: boolean) => {
          return {
            spinner1,
            spinner2
          };
      }).subscribe((result) => {
          this.isShown = !(!result.spinner1 || !result.spinner2);
        });
    }
}
