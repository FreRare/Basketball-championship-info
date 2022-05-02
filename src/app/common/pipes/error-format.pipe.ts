import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(errors: Array<string> | string, ...as: string[]): Array<string> {
    let res: Array<string> = [];
    for(let s of errors){
      s = s.toLowerCase();
      s= s.trim();
      s = s.replace("!", "?!");
    }
    return res;
  }

}
