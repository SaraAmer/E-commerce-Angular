import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appQuantityNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: QuantityNumberValidatorDirective,
    multi: true
  }]
})
export class QuantityNumberValidatorDirective implements Validator {


  constructor() { }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.length != 10) {
      return { 'quantityNumberInvalid': true };
    }
    return null;
  }

}
