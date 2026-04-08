import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type Utils = typeof PersonUtils;
type UtilsKey = keyof Utils;
type Tail<T extends readonly unknown[]> = T extends readonly [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;

@Pipe({
  name: 'utility',
})
export class UtilityPipe implements PipeTransform {
  transform<K extends UtilsKey>(
    value: Parameters<Utils[K]>[0],
    utilityName: K,
    ...args: Tail<Parameters<Utils[K]>>
  ): ReturnType<Utils[K]> {
    return (PersonUtils[utilityName] as (...allArgs: unknown[]) => unknown)(
      value,
      ...args,
    ) as ReturnType<Utils[K]>;
  }
}
