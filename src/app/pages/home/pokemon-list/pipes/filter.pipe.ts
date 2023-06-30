import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../../models/pokemon-result';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(results: Result[], searchText: string): Result[] {
    if (!results || !searchText) {
      return results;
    }

    return results.filter(result => {
      return result.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
