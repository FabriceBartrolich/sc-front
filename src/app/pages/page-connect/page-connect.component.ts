import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.css']
})
export class PageConnectComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }
  login() {
    console.log('je suis dans login', this.username, this.password);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username,
      "password": this.password
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/auth/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        localStorage.setItem('me', JSON.stringify(result));
        // Redirigez l'utilisateur vers la page d'accueil ici
        this.router.navigate(['/home']);
      })
      .catch(error => console.log('error', error));
  }

  isConnected(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      return true;
    }
    return false;
  }

getCurrentUser() : any {
const me : any = localStorage.getItem('me');
console.log(me);
return JSON.parse(me);
}

}
