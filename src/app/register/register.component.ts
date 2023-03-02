import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  username?: string;
  role:  string | undefined = "UnAuthorized";


  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()?.jwt) {
      this.isLoggedIn = true;
      this.role = this.tokenStorageService.getUser()?.role;
    }

  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}

