import Level_1 from "./1";
import Level_2 from "./2";
import Level_3 from "./3";
import Level_4 from "./4";
import Level_5 from "./5";

export type LevelType = {
  scheme: string;
  styles: string;
};

const LEVELS: LevelType[] = [
  {
    scheme: Level_1,
    styles: "level1.css",
  },
  {
    scheme: Level_2,
    styles: "level2.css",
  },
  {
    scheme: Level_3,
    styles: "level3.css",
  },
  {
    scheme: Level_4,
    styles: "level4.css",
  },
  {
    scheme: Level_5,
    styles: "level5.css",
  },
];

export default LEVELS;
