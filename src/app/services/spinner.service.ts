import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from '../state/main.state';

import * as types from '../actions/spinner.action.types';

@Injectable()
export class SpinnerService {

  constructor(private store: Store<State>) {}

  public show(): void {
    this.store.dispatch({type: types.SHOW_SPINNER});
  };

  public hide(): void {
    this.store.dispatch({type: types.HIDE_SPINNER});
  }
}
