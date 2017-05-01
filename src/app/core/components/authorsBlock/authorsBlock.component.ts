import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthorObject } from '../../../models/author.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { validateAuthors } from '../../../validators/authors.validator';

@Component ({
  selector: 'authors-component',
  styles: [`
  	.authors-container {
  		width: 200px;
  		border: 2px solid black;
  	}

  	input {
  		cursor: pointer;
  		width: 15px;
  		height: 15px;
  	}

  	.author {
  		display: flex;
  		justify-content: space-between;
  		align-items: center;
  		margin: 10px;
  	}

  	p.invalid {
  		color: red;
  	}
  `],
  template: `
    <div class="add-course-form-field" [formGroup]="modelForm">
      <div
        class="authors-container"
        [formArrayName]="'items'"
        [class.invalid]="!modelForm.controls.selectedItems.valid"
      >
        <div
          class="author"
          *ngFor="let item of modelForm.controls.items.controls"
          [formGroup]="item"
        >
          <input type="checkbox" formControlName="checked">
          <span>{{ item.controls.value.value }}</span>
        </div>
      </div>
      <p
        [class.invalid]="!modelForm.controls.selectedItems.valid"
        *ngIf="!modelForm.controls.selectedItems.valid"
      >
        Check at least one author!
      </p>
    </div>
	`
})

export class AuthorsComponent implements OnChanges {
  @Input() public authors: AuthorObject[];
  @Input() public checkedAuthors?: AuthorObject[];
  public modelForm: FormGroup;
  @Output()
  public checkedAuthorsChange = new EventEmitter();

  public ngOnChanges(changes) {
    const items = this.authors || [];
    const group = [];

    items.forEach((l) => {
      let isChecked = false;
      if (this.checkedAuthors.findIndex((item) =>
        item.name.toLowerCase() === l.name.toLowerCase()) !== -1
      ) {
        isChecked = true;
      }
      group.push(new FormGroup({
        key: new FormControl(l.name),
        value: new FormControl(l.name),
        checked: new FormControl(isChecked),
      }));
    });

    let formControlArray = new FormArray(group);

    this.modelForm = new FormGroup({
      items: formControlArray,
      selectedItems: new FormControl(validateAuthors, Validators.required)
    });

    formControlArray.valueChanges.subscribe((v) => {
      this.modelForm.controls.selectedItems.setValue(validateAuthors(v));
      const checkedItems = this.modelForm.controls.selectedItems.value.map((item) => {
        return {
          name: item
        };
      });
      this.checkedAuthorsChange.emit(checkedItems);
    });
  }
}
