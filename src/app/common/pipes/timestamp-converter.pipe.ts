import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampConverter'
})
export class TimestampConverterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let offset = (new Date(value)).getTimezoneOffset() * 60000;
    let isoString = new Date((new Date(value).getTime() - offset)).toLocaleDateString().replace("Z", "").replace("T", "");
    return isoString;
  }

}
