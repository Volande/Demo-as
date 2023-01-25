import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  public makeFormFieldsClean(formToCheck: any):void {
    if (formToCheck != null) {
      Object.keys(formToCheck.controls).forEach(key => {
        formToCheck.controls[key].markAsUntouched({});
        formToCheck.controls[key].markAsPristine();
      });
    }
  }

  public makeFormFieldsDirty(formToCheck: any):void {
    if (formToCheck != null) {
      Object.keys(formToCheck.controls).forEach(key => {
        formToCheck.controls[key].markAsDirty();
      });
    }
  }
}
