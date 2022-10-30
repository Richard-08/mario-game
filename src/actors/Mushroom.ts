import { Vector } from "../Vector";
import { State } from "../State";
import { VectorInterface, StateInterface, Actor } from "../types";
import { ActorEnums, StatusEnums } from "../enums";

export class Mushroom implements Actor {
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
    return ActorEnums.MUSHROOM;
  }

  get size() {
    return new Vector(1, 1);
  }

  static create(posistion: VectorInterface) {
    return new Mushroom(posistion, new Vector(2, 0));
  }

  collide(state: StateInterface): StateInterface {
    let player = state.player;

    if (!player) {
      throw new Error("Player not found in level");
    }

    if (player.position.y + player.size.y < this.position.y + 0.5) {
      let filtered = state.actors.filter((a) => a != this);
      return new State(state.level, filtered, state.status);
    } else {
      return new State(state.level, state.actors, StatusEnums.LOST);
    }
  }

  update(time: number, state: StateInterface) {
    let newPos = this.position.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Mushroom(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Mushroom(this.reset, this.speed, this.reset);
    } else {
      return new Mushroom(this.position, this.speed.times(-1));
    }
  }
}
