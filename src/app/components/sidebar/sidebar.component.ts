import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GridComponent } from '../grid/grid.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NodeService } from '../../services/node.service';
import { SelectType } from '../../select-type';
import { MatButtonModule } from '@angular/material/button';
import { Node } from '../../node';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GridCardComponent } from '../grid-card/grid-card.component';
import { NodeCardComponent } from '../node-card/node-card.component';
import { SearchCardComponent } from '../search-card/search-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    GridComponent,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    GridCardComponent,
    NodeCardComponent,
    SearchCardComponent,
    DescriptionCardComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  hideSingleSelectionIndicator = signal(false);
  error: string | null = null;
  startNode?: Node;
  endNode?: Node;
  constructor(private service: NodeService) {}
  ngOnInit(): void {
    this.service.startNode.subscribe((node) => (this.startNode = node));
    this.service.endNode.subscribe((node) => (this.endNode = node));
  }
}
