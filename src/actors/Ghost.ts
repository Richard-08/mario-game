import { Vector } from "../Vector";
import { State } from "../State";
import { VectorInterface, StateInterface, Actor } from "../types";
import { ActorEnums, StatusEnums } from "../enums";

export class Ghost implements Actor {
  position: VectorInterface;
  speed: VectorInterface;
  reset?: VectorInterface;

  constructor(
    position: VectorInterface,
    speed: VectorInterface,
    reset?: VectorInterface
  ) {
    this.position = position;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return ActorEnums.GHOST;
  }

  get size() {
    return new Vector(1.2, 2);
  }

  static create(posistion: VectorInterface) {
    return new Ghost(posistion, new Vector(0, 2));
  }

  collide(state: StateInterface): StateInterface {
    return new State(state.level, state.actors, StatusEnums.LOST);
  }

  update(time: number, state: StateInterface) {
    let newPos = this.position.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Ghost(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Ghost(this.reset, this.speed, this.reset);
    } else {
      return new Ghost(this.position, this.speed.times(-1));
    }
  }
}
