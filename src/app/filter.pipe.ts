import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // return element from array that matches the search text 

  transform(items: any[], searchText: any): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      if (it.id.includes(searchText)) return it;
    });
  }
}