import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
})
export class FirstLetterUppercasePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
  }
}
