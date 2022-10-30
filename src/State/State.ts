import { StatusEnums, ActorEnums } from "../enums";
import {
  StatusType,
  Actor,
  LevelInterface,
  StateInterface,
  TrackKeysType,
} from "../types";
import { overlap } from "../utils";

export class State implements StateInterface {
  level: LevelInterface;
  status: StatusType;
  actors: Actor[];

  constructor(level: LevelInterface, actors: Actor[], status: StatusType) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level: LevelInterface) {
    return new State(level, level.actors, StatusEnums.PLAYING);
  }

  get player() {
    return this.actors.find((actor) => actor.type === ActorEnums.PLAYER);
  }

  update(time: number, keys: TrackKeysType): StateInterface {
    let actors = this.actors.map((actor) => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") {
      return newState;
    }

    let player = newState.player;

    if (!player) {
      throw new Error("Player not found in level");
    }

    if (this.level.touches(player.position, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
    return newState;
  }
}
