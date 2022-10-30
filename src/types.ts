import { StatusEnums, ActorEnums } from "./enums";

export type StatusType = `${StatusEnums}`;

export type ActorType = `${ActorEnums}`;

export interface VectorInterface {
  x: number;
  y: number;
  plus: (vector: VectorInterface) => VectorInterface;
  times: (factor: number) => VectorInterface;
}

export interface LevelInterface {
  plan: string;
  actors: Actor[];
  height: number;
  width: number;
  rows: string[][];
  touches: (
    posistion: VectorInterface,
    size: VectorInterface,
    type: string
  ) => boolean;
}

export interface StateInterface {
  level: LevelInterface;
  status: StatusType;
  actors: Actor[];
  player: Actor | undefined;
}

export interface Actor {
  position: VectorInterface;
  speed: VectorInterface;
  type: ActorType;
  size: VectorInterface;
  update: (time: number, state: StateInterface) => Actor;
}
