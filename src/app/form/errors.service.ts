import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  getAllErrors(title: string, ngControl: NgControl): Array<String> {
    let result: Array<String> = new Array<String>();
    if (ngControl.errors !== null) {
      const errorKeys = Object.keys(ngControl.errors);
      for (let errorKey of errorKeys) {
        const error = ngControl.errors[errorKey];
        let message;
        switch (errorKey) {
          case 'required':
            message = $localize`${title} is required`;
            break;

          case 'pattern':
            message = $localize`${title} has wrong pattern`;
            break;
          case 'email':
            message = $localize`${title} has wrong email format`;
            break;
          case 'minlength':
            message = $localize`${title} has wrong length! Required length: ${error.requiredLength}`;
            break;
          case 'maxlength':
            message = $localize`${title} has wrong length! Required length: ${error.requiredLength}`;
            break;
          case 'areEqual':
            message = $localize`${title} must be equal!`;
            break;

          default:
            message = $localize`Error: ${title}`;
        }
        result.push(message);
      }
    }
    return result;
  }
}
