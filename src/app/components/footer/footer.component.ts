import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

 constructor(private userService: UserService) { }

    isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
