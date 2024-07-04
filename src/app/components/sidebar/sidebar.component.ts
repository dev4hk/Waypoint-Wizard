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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    GridComponent,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  hideSingleSelectionIndicator = signal(false);
  selectType = SelectType.NONE;
  error: string | null = null;
  startNode?: Node;
  endNode?: Node;

  constructor(private service: NodeService) {}

  ngOnInit(): void {
    this.service.selectType.subscribe((type) => (this.selectType = type));
    this.service.startNode.subscribe((node) => (this.startNode = node));
    this.service.endNode.subscribe((node) => (this.endNode = node));
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value) => !value);
  }

  handleClickStart() {
    this.error = null;
    this.service.selectType.next(SelectType.START);
  }

  handleClickEnd() {
    this.error = null;
    this.service.selectType.next(SelectType.END);
  }

  handleClickWall() {
    this.error = null;
    this.service.selectType.next(SelectType.WALL);
  }

  handleStart() {
    if (
      !this.service.startNode.getValue() ||
      !this.service.endNode.getValue()
    ) {
      this.error = 'Please select 1 start, 1 end, and walls (optional)';
    } else {
      this.service.simulate();
    }
  }
}
