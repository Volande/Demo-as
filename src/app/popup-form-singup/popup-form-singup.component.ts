import {Component, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupFormLoginComponent} from "../popup-form-login/popup-form-login.component";

@Component({
  selector: 'app-popup-form-singup',
  templateUrl: './popup-form-singup.component.html',
  styleUrls: ['./popup-form-singup.component.css']
})
export class PopupFormSingupComponent implements OnInit {

  reactiveForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
  });

  hide = true;
  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogPopupLogin: MatDialogRef<PopupFormLoginComponent>,
    @Optional() public dialogPopupSingUp: MatDialogRef<PopupFormSingupComponent>,
  ) {

  }

  isLoggedIn = false;
  isLoginFailed = false;
  role: string | undefined = "UnAuthorized";


  ngOnInit(): void {

  }

  get login() {
    return this.reactiveForm.get('login');
  }

  get email() {
    return this.reactiveForm.get('email');
  }

  get password() {
    return this.reactiveForm.get('password');
  }

  reloadPage(): void {
    window.location.reload();
  }

  replacePage(): void {
    window.location.replace("/shop/main-page");
  }

  openLoginDialog() {
    this.dialogPopupLogin = this.dialog.open(PopupFormLoginComponent);
    this.dialogPopupSingUp.close()
  }



  onSubmit() {
    const controls = this.reactiveForm.controls;


    /** Проверяем форму на валидность */
    if (this.reactiveForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;

    } else {
      this.authService.register(
        this.reactiveForm.value.login,
        this.reactiveForm.value.email,
        this.reactiveForm.value.password,
      ).subscribe(
        {
          next: userInfo => {
            this.tokenStorage.saveUser(userInfo);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.role = this.tokenStorage.getUser()?.role;
            this.reloadPage();
          }, error: error => {
            this.errorMessage = "Incorrect login or password";
          }
        })
    }
  }

}
