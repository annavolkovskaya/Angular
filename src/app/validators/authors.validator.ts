import { FormControl } from '@angular/forms';

export function validateAuthors(items) {
  let selectedItems = items.filter((l) => l.checked).map((l) => l.key);
  return selectedItems.length ? selectedItems : null;
}
