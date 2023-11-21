import { Component, } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  isConnected: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  // ngOnInit() {
  //   this.checkLoginStatus();
  // }

  // checkLoginStatus() {
  //   this.isConnected = !!localStorage.getItem('me'); // '!!' convertit la valeur en booléen
  // }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    localStorage.clear();

    
      this.isConnected = false;
    this.router.navigate(['/home']);
  }
}



