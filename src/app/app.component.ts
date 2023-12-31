import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})    
export class AppComponent {
  title = 'series-connect-front';

  constructor(public toastService: ToastService) { }

getToastClass() {
  return `myToast ${this.toastService.toastMessage?.type}`
}
}
