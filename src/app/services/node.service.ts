import { Injectable } from '@angular/core';
import { Node } from '../node';
import { BehaviorSubject } from 'rxjs';
import { SelectType } from '../select-type';
import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  nodes = new BehaviorSubject<Node[][]>([]);
  startNode = new BehaviorSubject<Node | undefined>(undefined);
  endNode = new BehaviorSubject<Node | undefined>(undefined);
  wallNodes = new BehaviorSubject<Set<Node>>(new Set<Node>());
  selectType = new BehaviorSubject<SelectType>(SelectType.NONE);
  isEndReached = false;
  isUnReachable = false;
  isSearchFinished = new BehaviorSubject<boolean>(false);
  rows = 10;
  cols = 15;

  constructor() {
    this.createGrid();
  }

  createGrid() {
    const grid: Node[][] = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = new Node(this.createId(i, j), i, j);
      }
    }
    this.nodes.next(grid);
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
    const queue = new PriorityQueue<Node>(compareNodes);
    queue.enqueue(this.startNode.value!);
    while (!this.isEndReached && !queue.isEmpty()) {
      const curr = queue.dequeue();
      this.addOpenNodes(curr, queue);
      curr.isVisited = true;
      if (curr === this.endNode.value) {
        this.isEndReached = true;
        this.backtrackToGetShortestPath();
      }
    }
    if (!this.isEndReached && queue.isEmpty()) {
      this.isUnReachable = true;
    }
    this.isSearchFinished.next(this.isEndReached || this.isUnReachable);
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

  addOpenNodes(node: Node, queue: PriorityQueue<Node>) {
    const arr = this.nodes.value;
    const { row, col } = node;
    if (row > 0) {
      this.openNode(arr[row - 1][col], node, queue);
    }
    if (row < this.rows - 1) {
      this.openNode(arr[row + 1][col], node, queue);
    }
    if (col > 0) {
      this.openNode(arr[row][col - 1], node, queue);
    }
    if (col < this.cols - 1) {
      this.openNode(arr[row][col + 1], node, queue);
    }
  }

  openNode(node: Node, parentNode: Node, queue: PriorityQueue<Node>) {
    if (!node.isOpen && !node.isVisited && !node.isWall) {
      node.isOpen = true;
      node.parent = parentNode;
      queue.enqueue(node);
    }
  }

  clear() {
    this.createGrid();
    this.startNode.next(undefined);
    this.endNode.next(undefined);
    this.wallNodes.next(new Set());
    this.selectType.next(SelectType.NONE);
    this.isEndReached = false;
    this.isUnReachable = false;
    this.isSearchFinished.next(false);
  }

  setRows(rows: number) {
    this.rows = rows;
  }

  setCols(cols: number) {
    this.cols = cols;
  }
}

const compareNodes: ICompare<Node> = (a: Node, b: Node) => {
  if (a.fCost < b.fCost) {
    return -1;
  }
  if (a.fCost > b.fCost) {
    return 1;
  }
  return a.gCost < b.gCost ? -1 : 1;
};
