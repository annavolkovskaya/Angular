import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateFieldComponent),
  multi: true
};

@Component ({
  selector: 'date-field-component',
  template: `
    <div class="form-group add-course-form-field">
      <label for="duration">Date</label>
        <input
          [(ngModel)]="value"
          #date="ngModel"
          id="date"
          name="date"
          (blur)="onBlur()">
    </div>
	`,
  providers: [CUSTOM_ACCESSOR]
})

export class DateFieldComponent implements ControlValueAccessor {
  private innerValue: any = '';
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  public onBlur() {
    this.onTouchedCallback();
  }

  public writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
