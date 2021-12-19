import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted!: false;

  loginForm = new FormGroup({

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

    checkValue: new FormControl(false),

  });
  get f() {
    return this.loginForm.controls;
  }

  constructor(private authservice: AuthService ,
    private router : Router) {}

  ngOnInit(): void {
  }
  onSubmit(loginForm:any){
    const payload = {
      "user_email":this.loginForm.value.email,
      "user_password":this.loginForm.value.password
    }

    this.authservice.loginUserS(payload).subscribe(
      (resp: any) => {
        if (resp.msg === 'User found') {
          const token = 'Token';
          localStorage.setItem(token , token)
          alert('User found')
          this.router.navigate(['/dashboard'])
        }
        if (resp.msg === 'Invalid credentials') {
          alert('Invalid credentials')
        }
      },
      (err: any) => {}
    );

  }

}
