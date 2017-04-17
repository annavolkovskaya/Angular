import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  public spinnerIsShowed = new BehaviorSubject(false);

  public show(): void {
    this.spinnerIsShowed.next(true);
  };

  public hide(): void {
    this.spinnerIsShowed.next(false);
  }
}
