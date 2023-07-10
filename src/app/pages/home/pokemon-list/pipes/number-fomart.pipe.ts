import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFomart',
})
export class NumberFomartPipe implements PipeTransform {
  transform(number: number, maxLenght = 3): string {
    if (!number) {
      return '#XXX';
    }
    let numberString = number.toString();
    while (numberString.length < maxLenght) {
      numberString = '0' + numberString;
    }
    return '#' + numberString;
  }
}
