import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DurationFieldComponent),
  multi: true
};

@Component({
  selector: 'duration-field-component',
  template: `
    <div class="form-group add-course-form-field">
      <label for="duration">Duration</label>
        <input
          [(ngModel)]="value"
          #durationInput="ngModel"
          id="duration"
          name="durationInput"
          (ngModelChange)="handleDurationInputChange($event)"
          (blur)="onBlur()">
         <span>{{durationInput.value | durationTransform}}</span>
    </div>
  `,
  providers: [CUSTOM_ACCESSOR]
})
export class DurationFieldComponent implements ControlValueAccessor {
  public duration: string;
  private innerValue: any = '';
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  public handleDurationInputChange = (value) => {
    this.duration = value;
  }

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
