import { Vector } from "../Vector";
import {
  VectorInterface,
  Actor,
  TrackKeysType,
  StateInterface,
} from "../types";
import { ActorEnums } from "../enums";
import { CONFIG } from "../config";

export class Player implements Omit<Actor, "collide" | "update"> {
  position: VectorInterface;
  speed: VectorInterface;
  private playerXSpeed: number;
  private gravity: number;
  private jumpSpeed: number;

  constructor(position: VectorInterface, speed: VectorInterface) {
    this.position = position;
    this.speed = speed;

    this.playerXSpeed = CONFIG.playerXSpeed;
    this.gravity = CONFIG.gravity;
    this.jumpSpeed = CONFIG.jumpSpeed;
  }

  get type() {
    return ActorEnums.PLAYER;
  }

  get size(): VectorInterface {
    return new Vector(1, 1);
  }

  static create(position: Vector) {
    return new Player(position.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }

  update(time: number, state: StateInterface, keys: TrackKeysType) {
    let xSpeed = 0;
    if (keys.ArrowLeft) {
      xSpeed -= this.playerXSpeed;
    }
    if (keys.ArrowRight) {
      xSpeed += this.playerXSpeed;
    }
    let pos = this.position;
    let movedX = pos.plus(new Vector(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }
    let ySpeed = this.speed.y + time * this.gravity;
    let movedY = pos.plus(new Vector(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -this.jumpSpeed;
    } else {
      ySpeed = 0;
    }
    return new Player(pos, new Vector(xSpeed, ySpeed));
  }
}
