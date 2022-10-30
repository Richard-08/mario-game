import { Vector } from "../Vector";
import { VectorInterface } from "../types";
import { ActorEnums } from "../enums";

export class Player {
  position: VectorInterface;
  speed: VectorInterface;

  constructor(position: VectorInterface, speed: VectorInterface) {
    this.position = position;
    this.speed = speed;
  }

  get type() {
    return ActorEnums.PLAYER;
  }

  static size(): VectorInterface {
    return new Vector(1, 1);
  }

  static create(position: Vector) {
    return new Player(position.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }
}
