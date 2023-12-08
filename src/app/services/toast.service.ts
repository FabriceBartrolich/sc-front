import { Injectable } from '@angular/core';

interface ToastMessage {
  title: string;
  type: string;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  toastMessage : ToastMessage | null = null;

  toggle(message : ToastMessage) {
    // this.isToastVisible = !this.isToastVisible;
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }
}