import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
  selector: '[validateDate][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective),
    multi: true
  }]
})
export class DateValidatorDirective implements Validator {

  private regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  public validate(value: FormControl) {
    if (!this.regex.test(value.value)) {
      return {
        invalidDate: true
      };
    }
    return null;
  }
}
