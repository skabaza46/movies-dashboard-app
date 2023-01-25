import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, EventEmitter  } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.model';
import { AuthResponseData } from '../shared/authresponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') commentNgForm!: NgForm;

  authObs = new Observable<AuthResponseData>();


  constructor(private http:HttpClient, private authService: AuthService,
    private router: Router){}

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);

  hidePassword = true;

  isLoginMode = true;
  isLoading = false;
  error: string = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getLastNameErrorMessage() {
    if (this.last_name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.last_name.hasError('last_name') ? 'Not a valid value' : '';
  }

  getFirstNameErrorMessage() {
    if (this.first_name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.first_name.hasError('first_name') ? 'Not a valid value' : '';
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('password') ? 'Not a valid password' : '';
  }

  ngOnInit(): void {

  }

  onSubmit = () => {

    const email = this.email.getRawValue();
    const first_name = this.first_name.getRawValue();
    const last_name = this.last_name.getRawValue();
    const password = this.password.getRawValue();

    if (this.isLoginMode){
      this.isLoading = true
      this.authObs = this.authService.signIn(email,password);

    }else{
      this.isLoading = true
      this.authObs = this.authService.signUp(email,first_name,last_name,password);

    }

    this.authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
        this.error = "";
      },
      errorMessage => {
        this.error = "Login failed, please try again !";
        this.isLoading = false;
      }
    );

  }

}
