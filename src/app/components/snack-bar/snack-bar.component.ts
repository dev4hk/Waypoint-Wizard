import { Component } from '@angular/core';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css',
})
export class SnackBarComponent {
  constructor(private service: NodeService) {}

  isEndReached() {
    return this.service.isEndReached;
  }

  isUnReachable() {
    return this.service.isUnReachable;
  }
}
