import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NodeService } from '../../services/node.service';
import { SelectType } from '../../select-type';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrl: './node-card.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeCardComponent implements OnInit {
  error: string | null = null;
  selectType = SelectType.NONE;

  constructor(private service: NodeService) {}

  ngOnInit(): void {
    this.service.selectType.subscribe((type) => (this.selectType = type));
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
}
