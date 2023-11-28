import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  heroForm : any;

  constructor(private router: Router) { }

  ngOnInit(): void {

  
  this.heroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    alterEgo: new FormControl(''),
    power: new FormControl('', Validators.required),
  });
}

get name() {
  return this.heroForm.get('name');
}

get power() {
  return this.heroForm.get('power');
}
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

    fetch("http://localhost:3000/api/auth/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        this.router.navigate(['/connect']);
      })
      .catch(error => console.log('error', error));
  }





}
