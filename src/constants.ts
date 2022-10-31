import { Player } from "./actors";
import { Lava } from "./actors";
import { Coin } from "./actors";
import { Ghost } from "./actors";
import { Mushroom } from "./actors";

export const CHARACTERS: {
  [key: string]:
    | string
    | typeof Player
    | typeof Coin
    | typeof Lava
    | typeof Mushroom
    | typeof Ghost;
} = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  v: Lava,
  E: Mushroom,
  G: Ghost,
} as const;

export const EVENT_KEYS: Readonly<string[]> = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
] as const;
