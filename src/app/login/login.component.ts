import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormsService} from "../common/form.service";
import {LoginService} from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _username: string = "";
  private _password: string = "";
  private _loginService: LoginService;
  private _formsService: FormsService;

  private _router: Router;

  constructor(loginService: LoginService, formsService: FormsService, router: Router) {
    this._loginService = loginService;
    this._formsService = formsService;
    this._router = router;
  }

  public isAuthenticated = false;

  public logout(): void {
    this._loginService.signout();
  }

  ngOnInit() {
    let userLoggedIn: Boolean
      = this._loginService.checkUserLoggedIn();
    if (userLoggedIn) {
      this._router.navigate(['/main']);
      this._loginService.isAuthenticated$.subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);

    }
  }
  public get username() {
    return this._username;
  }

  public set username(val: string) {
    this._username = val;
  }

  public get password() {
    return this._password;
  }

  public set password(val: string) {
    this._password = val;
  }

  public onClickClear(loginForm: any): void{
    this._username = "";
    this._password = "";

    this._formsService.makeFormFieldsClean(loginForm);
  }




}
