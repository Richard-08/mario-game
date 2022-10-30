import { Vector } from "../Vector";
import { LevelInterface, Actor, VectorInterface } from "../types";
import { CHARACTERS } from "../constants";

export class Level implements LevelInterface {
  plan: string;
  actors: Actor[];

  constructor(scheme: string) {
    this.plan = scheme;
    this.actors = [];
  }

  private get formattedRows(): string[][] {
    return this.plan
      .trim()
      .split("\n")
      .map((l) => [...l]);
  }

  get height(): number {
    return this.formattedRows.length;
  }

  get width(): number {
    return this.formattedRows[0].length;
  }

  get rows() {
    return this.formattedRows.map((row, y) => {
      return row.map((ch, x) => {
        let type = CHARACTERS[ch];

        if (typeof type == "string") {
          return type;
        }

        this.actors.push(type.create(new Vector(x, y), ch));

        return "empty";
      });
    });
  }

  touches(
    posistion: VectorInterface,
    size: VectorInterface,
    type: string
  ): boolean {
    var xStart = Math.floor(posistion.x);
    var xEnd = Math.ceil(posistion.x + size.x);
    var yStart = Math.floor(posistion.y);
    var yEnd = Math.ceil(posistion.y + size.y);

    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.rows[y][x];
        if (here == type) return true;
      }
    }
    return false;
  }
}
