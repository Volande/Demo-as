import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormsService} from "../common/form.service";
import {LoginService} from "./login.service";
import {LoginUser} from "../../dataModels/loginUser.service";

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


  ngOnInit() {
    let userLoggedIn: Boolean
      = this._loginService.checkUserLoggedIn();
    if (userLoggedIn) {
      this._router.navigate(['/main']);
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

  public onClickLogin(loginForm: any): void{
    this._formsService.makeFormFieldsDirty(loginForm);

    if (loginForm.valid) {
      let userToLogin: LoginUser = new LoginUser(this._username, this._password);
      let self:any = this;

      self._loginService.login(userToLogin)
        .subscribe((resp: any) => {
          if (resp != null &&
            resp.userId != null &&
            resp.userId.trim() !== "" &&
            resp.tokenValue != null &&
            resp.tokenValue.trim() !== "") {

            self._loginService.setSessionCurrentUser(resp);
            self._router.navigate(['/main']);
          }
        }, (error: HttpErrorResponse) => {
          if (error != null) {
            if (error.status === 0) {
              console.log("Client error.");
            } else if (error.status === 401 || error.status === 403) {
              self._userName = "";
              self._userPass = "";
              self._formsService.makeFormFieldsClean(loginForm);
              console.log("You are not authorized.");
            } else if (error.status === 500) {
              console.log("Server error occurred.");
            } else {
              console.log("Unknown error: " + error.status);
            }
          }
        });
    }
  }

}
