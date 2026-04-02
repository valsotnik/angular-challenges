import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compute' })
export class ComputePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
