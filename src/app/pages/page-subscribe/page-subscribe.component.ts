import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css']
})
export class PageSubscribeComponent implements OnInit{

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  


  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
}



  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }


  signUp() {

   if (this.password.value !== this.confirmPassword.value) {
      console.error("Les mots de passe ne correspondent pas.");
      return; 
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username.value,
      "email": this.email.value,
      "password": this.password.value
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/auth/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        this.router.navigate(['/connect']);
      })
      .catch(error => console.log('error', error));
  }






}