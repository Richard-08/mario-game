import { StatusEnums, ActorEnums } from "../enums";
import { StatusType, Actor, LevelInterface, StateInterface } from "../types";

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
}
