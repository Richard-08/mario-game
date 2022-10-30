import { Vector } from "../Vector";
import { State } from "../State";
import { VectorInterface, StateInterface, Actor } from "../types";
import { ActorEnums, StatusEnums } from "../enums";

export class Coin implements Omit<Actor, "collide" | "update"> {
  position: VectorInterface;
  basePos: VectorInterface;
  wobble: number;
  private wobbleSpeed: number;
  private wobbleDist: number;

  constructor(
    position: VectorInterface,
    basePos: VectorInterface,
    wobble: number
  ) {
    this.position = position;
    this.basePos = basePos;
    this.wobble = wobble;

    this.wobbleSpeed = 8;
    this.wobbleDist = 0.07;
  }

  get type() {
    return ActorEnums.COIN;
  }

  get size() {
    return new Vector(0.6, 0.6);
  }

  static create(posistion: VectorInterface) {
    let basePos = posistion.plus(new Vector(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }

  update(time: number): Coin {
    let wobble = this.wobble + time * this.wobbleSpeed;
    let wobblePos = Math.sin(wobble) * this.wobbleDist;
    return new Coin(
      this.basePos.plus(new Vector(0, wobblePos)),
      this.basePos,
      wobble
    );
  }

  collide(state: StateInterface): StateInterface {
    let filtered = state.actors.filter((a) => a !== this);
    let status = state.status;
    if (!filtered.some((a) => a.type === ActorEnums.COIN)) {
      status = StatusEnums.WON;
    }
    return new State(state.level, filtered, status);
  }
}
