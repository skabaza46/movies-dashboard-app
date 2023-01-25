import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  email = new FormControl({value: "",disabled: true}, [Validators.required, Validators.email]);
  password = new FormControl({value: "",disabled: true}, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
  first_name = new FormControl({value: "",disabled: false}, [Validators.required]);
  last_name = new FormControl({value: "",disabled: false}, [Validators.required]);

  constructor(private authService: AuthService){};

  isLoading = false;
  error = "";

  ngOnInit(): void {

    this.authService.user.subscribe((user)=>{

      if(user){
        this.first_name.setValue(user.first_name);
        this.last_name.setValue(user.last_name);
        this.email.setValue(user.email)
      }

    })

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

  onSubmit = () => {
    const first_name = this.first_name.getRawValue();
    const last_name = this.last_name.getRawValue();

    console.log("Updated user profile !")
    console.log(`First Name: ${first_name}`);
    console.log(`Last Name: ${last_name}`);

  }
}
