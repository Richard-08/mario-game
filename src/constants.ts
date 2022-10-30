import { Player } from "./actors";
import { Lava } from "./actors";
import { Coin } from "./actors";
import { Ghost } from "./actors";
import { Mushroom } from "./actors";

export const CHARACTERS = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  v: Lava,
  E: Mushroom,
  G: Ghost,
};
