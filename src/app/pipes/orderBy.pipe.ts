import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  public transform (items: any[], field: string) {
    switch (field) {
      case 'date':
        return items.sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime());
      default:
        return items.sort((a, b) => a[field] - b[field]);
    }
  }
}
