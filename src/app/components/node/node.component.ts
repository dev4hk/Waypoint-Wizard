import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../node';
import { NodeService } from '../../services/node.service';
import { SelectType } from '../../select-type';

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css',
})
export class NodeComponent implements OnInit {
  @Input() node!: Node;
  @Input() selectType!: SelectType;
  @Input() startNode?: Node;
  @Input() endNode?: Node;
  @Input() wallNodes!: Set<Node>;

  constructor(private service: NodeService) {}

  ngOnInit(): void {}

  handleClick() {
    if (this.selectType === SelectType.START) {
      this.service.updateStartNode(this.node);
    }
    if (this.selectType === SelectType.END) {
      this.service.updateEndNode(this.node);
    }
    if (this.selectType === SelectType.WALL) {
      this.service.updateWallNode(this.node);
    }
  }

  isStartNode() {
    return this.startNode?.id === this.node?.id;
  }

  isEndNode() {
    return this.endNode?.id === this.node?.id;
  }

  isWallNode() {
    return this.wallNodes?.has(this.node);
  }
}
