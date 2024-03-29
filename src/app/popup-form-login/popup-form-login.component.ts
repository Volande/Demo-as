import {Component, Injectable, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupFormSingupComponent} from "../popup-form-singup/popup-form-singup.component";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-popup-form-login',
  templateUrl: './popup-form-login.component.html',
  styleUrls: ['./popup-form-login.component.css']
})
export class PopupFormLoginComponent implements OnInit {
  reactiveForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(30)]]
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
  get password() {
    return this.reactiveForm.get('password');
  }
  reloadPage(): void {
    window.location.reload();
  }

  closeDialog(){
    window.close()
  }
  replacePage(): void {
    window.location.replace("/shop/main-page");
  }

  replaceSingUp(){
    this.dialog.open(PopupFormSingupComponent)
   this.dialog.afterAllClosed
  }

  openSingUpDialog(){
    this.dialogPopupSingUp = this.dialog.open(PopupFormSingupComponent);
    this.dialogPopupLogin.close()
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
      this.authService.login(
        this.reactiveForm.value.login,
        this.reactiveForm.value.password
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
