import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted!: false;

  registerForm = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      // Validators.pattern('^((\\-?)|0)?[0-9]{10}$')
      // Validators.minLength(13),
    ]),
    checkValue: new FormControl(''),
  });
  get f() {
    return this.registerForm.controls;
  }
  constructor(private authservice: AuthService , private router : Router) {}

  ngOnInit(): void {}

  onSubmit(registerForm: any) {
    console.log(registerForm.value);

    const payload = {
      "user_firstname":this.registerForm.value.fullname,
      "user_email":this.registerForm.value.email,
      "user_phone":this.registerForm.value.phoneNumber,
      "user_password":this.registerForm.value.password,
      "user_lastname":"ni",
      "user_city":"Hyderabad",
      "user_zipcode": "500072"
    }

    this.authservice.registerNewuser(payload).subscribe(
      (resp: any) => {

        if (resp.msg === 'Registered Successfully') {
          alert('Registered Successfully')
          this.router.navigate(['/Signin'])

        }
        if (resp.status === 500) {
          if (resp.error === 'auth/email-already-exists') {
          }
          if (resp.error === 'auth/phone-number-already-exists') {
          }
          if (resp.error === 'auth/invalid-phone-number') {
          }
        }
      },
      (err: any) => {}
    );
  }
}
