import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  public spinnerIsShowed = new BehaviorSubject(false);

  public show(): void {
    Observable.create((observer) => {
      observer.next(true);
    })
    .subscribe((value) => {
      this.spinnerIsShowed.next(value);
      console.log('value is send' + value);
    });
  };

  public hide(): void {
    Observable.create((observer) => {
      setTimeout(() => observer.next(false), 1500);
    })
    .subscribe((value) => this.spinnerIsShowed.next(value));
  }
}
