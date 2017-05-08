import { Directive , forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
  selector: '[validateDuration][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: forwardRef(() => DurationValidatorDirective),
    multi: true
  }]
})
export class DurationValidatorDirective implements Validator {

  private regex = /^[0-9]+$/;

  public validate(value: FormControl) {
    if (!this.regex.test(value.value)) {
      return {
        invalidDuration: true
      };
    }
    return null;
  }
}
