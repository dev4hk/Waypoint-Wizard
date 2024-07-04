export class Node {
  public id: string;
  public parent: Node | null = null;
  public row: number;
  public col: number;
  public gCost: number = 0;
  public hCost: number = 0;
  public fCost: number = 0;
  public isStart: boolean = false;
  public isEnd: boolean = false;
  public isWall: boolean = false;
  public isVisited: boolean = false;

  constructor(id: string, row: number, col: number) {
    this.id = id;
    this.row = row;
    this.col = col;
  }
}
