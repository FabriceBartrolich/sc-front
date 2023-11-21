import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css']
})
export class PageSubscribeComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }
  signUp() {

    if (this.password !== this.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      return; 
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username,
      "email": this.email,
      "password": this.password
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/auth/subscribe", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        this.router.navigate(['/connect']);
      })
      .catch(error => console.log('error', error));
  }





}
