import { Component, Input } from '@angular/core';
import { Show } from 'src/app/models/show';


@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent {
  @Input() shows: Show[] = [];
}
