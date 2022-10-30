import { Vector } from "../Vector";

export class Enemy {
  position: Vector;
  speed: Vector;
  reset?: Vector;

  constructor(position: Vector, speed: Vector, reset?: Vector) {
    this.position = position;
    this.speed = speed;
    this.reset = reset;
  }

  static create(position: Vector) {
    return new this(position, new Vector(0, 2));
  }
}
