import { Injectable } from '@angular/core';
import { Node } from '../node';
import { BehaviorSubject } from 'rxjs';
import { SelectType } from '../select-type';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  nodes = new BehaviorSubject<Node[][]>([]);
  startNode = new BehaviorSubject<Node | undefined>(undefined);
  endNode = new BehaviorSubject<Node | undefined>(undefined);
  wallNodes = new BehaviorSubject<Set<Node>>(new Set<Node>());
  selectType = new BehaviorSubject<SelectType>(SelectType.NONE);

  constructor() {
    this.nodes.next(this.createGrid());
  }

  createGrid() {
    const grid: Node[][] = [];
    for (let i = 0; i < 15; i++) {
      grid[i] = [];
      for (let j = 0; j < 15; j++) {
        grid[i][j] = new Node(this.createId(i, j), i, j);
      }
    }
    return grid;
  }

  createId(row: number, col: number) {
    return 'r' + row + 'c' + col;
  }

  updateStartNode(node: Node) {
    this.startNode.next(
      this.startNode.value?.id === node.id ? undefined : node
    );
    if (this.endNode.value?.id === node.id) {
      this.endNode.next(undefined);
    }
    if (this.wallNodes.value?.has(node)) {
      this.wallNodes.value.delete(node);
    }
  }

  updateEndNode(node: Node) {
    this.endNode.next(this.endNode.value?.id === node.id ? undefined : node);
    if (this.startNode.value?.id === node.id) {
      this.startNode.next(undefined);
    }
    if (this.wallNodes.value?.has(node)) {
      this.wallNodes.value.delete(node);
    }
  }

  updateWallNode(node: Node) {
    if (this.wallNodes.value?.has(node)) {
      this.wallNodes.value.delete(node);
    } else {
      this.wallNodes.value.add(node);
    }

    if (this.startNode.value?.id === node.id) {
      this.startNode.next(undefined);
    }
    if (this.endNode.value?.id === node.id) {
      this.endNode.next(undefined);
    }
  }

  simulate() {
    this.setupValuesInNode();
  }

  setupValuesInNode() {
    this.startNode.value!.isStart = true;
    this.endNode.value!.isEnd = true;
    for (let node of this.wallNodes.value) {
      node.isWall = true;
    }
    console.log(this.nodes.value);
  }
}
