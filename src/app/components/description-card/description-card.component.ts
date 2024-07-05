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
import { Node } from '../../node';

@Component({
  selector: 'app-description-card',
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
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionCardComponent {}
