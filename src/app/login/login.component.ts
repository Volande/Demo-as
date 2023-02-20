import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserInformation} from "../user-information";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role:  string | undefined = "UnAuthorized";

  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    if (this.tokenStorage.getUser()?.jwt) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser()?.role;
    }


   }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      userInfo => {
        this.tokenStorage.saveUser(userInfo);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser()?.role;
        this.reloadPage();
        this.replacePage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  replacePage(): void{
    window.location.replace("/shop/main-page");
  }
}
