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
  currentNode: Node | undefined = undefined;
  endNode = new BehaviorSubject<Node | undefined>(undefined);
  wallNodes = new BehaviorSubject<Set<Node>>(new Set<Node>());
  selectType = new BehaviorSubject<SelectType>(SelectType.NONE);
  isEndReached = false;
  openList: Node[] = [];
  isUnReachable = false;
  rows = 17;
  cols = 30;

  constructor() {
    this.nodes.next(this.createGrid());
  }

  createGrid() {
    const grid: Node[][] = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
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
    this.currentNode = this.startNode.value ? this.startNode.value : undefined;
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
    this.setupStatusInNodes();
    this.calculateDistances();
    this.traverse();
  }

  setupStatusInNodes() {
    this.startNode.value!.isStart = true;
    this.endNode.value!.isEnd = true;
    for (let node of this.wallNodes.value) {
      node.isWall = true;
    }
  }

  calculateDistances() {
    const arr = this.nodes.value;
    const start = this.startNode.value;
    const end = this.endNode.value;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        const curr = arr[i][j];
        if (start && end) {
          this.getCost(start, end, curr);
        }
      }
    }
  }

  getCost(start: Node, end: Node, curr: Node) {
    let xDist = Math.abs(start.row - curr.row);
    let yDist = Math.abs(start.col - curr.col);
    curr.gCost = xDist + yDist;

    xDist = Math.abs(end.row - curr.row);
    yDist = Math.abs(end.col - curr.col);
    curr.hCost = xDist + yDist;

    curr.fCost = curr.gCost + curr.hCost;
  }

  traverse() {
    this.openList.push(this.currentNode!);
    while (!this.isEndReached && this.openList.length !== 0) {
      const currX = this.currentNode?.row;
      const currY = this.currentNode?.col;
      this.currentNode!.isVisited = true;
      const currentIndex = this.openList.indexOf(this.currentNode!);
      if (currentIndex > -1) {
        this.openList.splice(currentIndex, 1);
      }
      this.addOpenNodes(currX!, currY!);

      let bestNodeIndex = 0;
      let bestNodeFCost = Number.MAX_VALUE;
      for (let i = 0; i < this.openList.length; i++) {
        const curr = this.openList[0];
        if (curr.fCost < bestNodeFCost) {
          bestNodeIndex = i;
          bestNodeFCost = curr.fCost;
        } else if (curr.fCost === bestNodeFCost) {
          if (curr.gCost < this.openList[bestNodeIndex].gCost) {
            bestNodeIndex = i;
          }
        }
      }

      this.currentNode = this.openList[bestNodeIndex];
      if (this.currentNode === this.endNode.value) {
        this.isEndReached = true;
        this.backtrackToGetShortestPath();
      }
    }
    if (!this.isEndReached && this.openList.length === 0) {
      this.isUnReachable = true;
    }
  }

  backtrackToGetShortestPath() {
    let currNode = this.endNode.value;
    while (currNode !== this.startNode.value) {
      currNode = currNode!.parent;
      if (currNode !== this.startNode.value) {
        currNode!.isInShortestPath = true;
      }
    }
  }

  addOpenNodes(row: number, col: number) {
    const arr = this.nodes.value;
    if (row > 0) {
      this.openNode(arr[row - 1][col]);
    }
    if (row < this.rows - 1) {
      this.openNode(arr[row + 1][col]);
    }
    if (col > 0) {
      this.openNode(arr[row][col - 1]);
    }
    if (col < this.cols - 1) {
      this.openNode(arr[row][col + 1]);
    }
  }

  openNode(node: Node) {
    if (!node.isOpen && !node.isVisited && !node.isWall) {
      node.isOpen = true;
      node.parent = this.currentNode;
      this.openList.push(node);
    }
  }
}
