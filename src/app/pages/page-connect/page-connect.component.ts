import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.css'],
})
export class PageConnectComponent implements OnInit {


  raw!: FormGroup;
loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void {
    
  }

  get username() : any {
  
    return this.loginForm.get('username');
  }

  get password() : any {
    return this.loginForm.get('password');
  }


  // onSubmit() {
  //   console.log(this.loginForm.get('username'));
    
  // }

  login() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
console.log(this.username.value);
console.log(this.password.value);


    const raw = JSON.stringify({
      username: this.username.value,
      password: this.password.value,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3000/api/auth/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('mon info => ', requestOptions);
        localStorage.setItem('me', JSON.stringify(result));
        // Redirigez l'utilisateur vers la page d'accueil ici
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log('error', error));
  }

  isConnected(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      return true;
    }
    return false;
  }

  getCurrentUser(): any {
    const me: any = localStorage.getItem('me');
    const parsedMe = JSON.parse(me);

    return parsedMe;
  }
}
