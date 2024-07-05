import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NodeService } from '../../services/node.service';
import { Node } from '../../node';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-search-card',
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
    SnackBarComponent,
  ],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardComponent implements OnInit {
  error: string = '';
  @Input() startNode?: Node;
  @Input() endNode?: Node;
  isSearchFinished: boolean = false;

  constructor(private service: NodeService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.isSearchFinished.subscribe(
      (value) => (this.isSearchFinished = value)
    );
  }

  handleStart() {
    if (
      !this.service.startNode.getValue() ||
      !this.service.endNode.getValue()
    ) {
      this.error = '1 start node, 1 end node required';
    } else {
      this.error = '';
      this.service.simulate();
      this.openSnackBar();
    }
  }

  handleClear() {
    this.service.clear();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
    });
  }
}
