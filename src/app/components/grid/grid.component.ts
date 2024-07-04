import { Component } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { Node } from '../../node';
import { NodeService } from '../../services/node.service';
import { SelectType } from '../../select-type';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NodeComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  nodes: Node[][] = [];
  selectType: SelectType = SelectType.NONE;
  startNode: Node | undefined;
  endNode: Node | undefined;
  wallNodes: Set<Node> = new Set();

  constructor(private service: NodeService) {}

  ngOnInit(): void {
    this.service.selectType.subscribe((type) => (this.selectType = type));
    this.service.nodes.subscribe((nodes) => (this.nodes = nodes));
    this.service.startNode.subscribe((node) => (this.startNode = node));
    this.service.endNode.subscribe((node) => (this.endNode = node));
    this.service.wallNodes.subscribe(
      (wallNodes) => (this.wallNodes = wallNodes)
    );
  }
}
