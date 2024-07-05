import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-grid-card',
  templateUrl: 'grid-card.component.html',
  styleUrl: 'grid-card.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCardComponent {
  rows: number = 10;
  cols: number = 15;
  error: string = '';
  constructor(private service: NodeService) {}
  handleGridSize(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'rows') {
      this.rows = +value;
    }
    if (name === 'cols') {
      this.cols = +value;
    }
  }
  handleCreateGrid() {
    if (!this.isValidSize(this.rows) || !this.isValidSize(this.cols)) {
      this.error = 'Mininum: 2, maximum: 20';
    } else {
      this.service.setRows(this.rows);
      this.service.setCols(this.cols);
      this.service.createGrid();
      this.error = '';
    }
  }
  isValidSize(size: number) {
    return size >= 2 && size <= 20;
  }
}
