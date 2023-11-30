import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  toastMessage = '';

  toggle(message : string) {
    // this.isToastVisible = !this.isToastVisible;
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
}