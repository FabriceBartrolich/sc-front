import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css'],
})
export class PageSubscribeComponent {
  inscriptionForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      const newUser: any = this.inscriptionForm.value;
      console.log('je suis dans le submit, newUser = ', newUser);
      this.userService.subscribe(newUser).subscribe(
        () => {
          console.log('mise à jour effectuée');
          this.inscriptionForm.reset();
          const modalElement = document.getElementById('subscribeModal');
          const modalInstance = new Modal(modalElement!);
          modalInstance.show();
        },
        (error) => {
          console.error('Erreur lors de l’inscription:', error);
        }
      );
    } else {
      // Afficher un message d'erreur ou des indications pour les champs invalides
    }
  }

  goToHome() {
    this.router.navigate(['/connect']);
  }
}
