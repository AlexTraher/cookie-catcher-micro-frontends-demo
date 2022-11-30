import { Direction, DIRECTION_TO_CHANGE } from "./types";

export default class Box {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  max: number;
  static box: Box | null;

  constructor (x: number, y: number, speed: number, max: number) {
    this.x = x;
    this.speed = speed;
    this.max = max;

    this.y = y
    this.width = 100;
    this.height = 50;
  }

  move(direction: Direction) {
    const change = DIRECTION_TO_CHANGE[direction] * this.speed;
    let newX = this.x + change;

    if (newX >= this.max) {
      newX = this.max;
    }

    if (newX <= 0) {
      newX = 0;
    }

    this.x = newX;
  }

  static move(direction: Direction) {
    if (!this.box) { 
      return;
    }
    this.box.move(direction);
  }

  static create(x: number, y: number, speed: number, max: number) {
    this.box = new Box(x, y, speed, max);
  }

  static reset() {
    this.box = null;
  }

}