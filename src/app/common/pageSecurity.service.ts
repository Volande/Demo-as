import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PageSecurityService {
  constructor(private _router: Router) {}

  public gotoLoginPage() {
    this._router.navigate(['http://localhost:8082/api/v1/auth/login']);
  }

  public checkPageSecurityError(httpError: HttpErrorResponse) {
    if (!httpError || httpError.status == null) {
      throw new Error("Invalid http error object.");
    }

    if (httpError.status === 401) {
      this.gotoLoginPage();
    }

    if (httpError.status === 403) {
      this._router.navigate(['/accessDenied']);
    }
  }
}
