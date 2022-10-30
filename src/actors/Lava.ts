import { Vector } from "../Vector";
import { State } from "../State";
import { VectorInterface, StateInterface, Actor } from "../types";
import { ActorEnums, StatusEnums } from "../enums";

export class Lava implements Actor {
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
    return ActorEnums.LAVA;
  }

  get size() {
    return new Vector(1, 1);
  }

  static create(posistion: VectorInterface) {
    return new Lava(posistion, new Vector(0, 3), posistion);
  }

  collide(state: StateInterface): StateInterface {
    return new State(state.level, state.actors, StatusEnums.LOST);
  }

  update(time: number, state: StateInterface) {
    let newPos = this.position.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.position, this.speed.times(-1));
    }
  }
}
