import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Node } from './node';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-pathfinder';
}
