import { LevelInterface, StateInterface } from "../types";
import { createElement, drawGrid, drawActors } from "../utils";

export class DOMDisplay {
  el: HTMLElement;
  actorLayer: HTMLElement | null;
  scale: number;

  constructor(parent: HTMLElement, level: LevelInterface, scale: number) {
    this.el = createElement("div", { class: "game" }, drawGrid(level, scale));
    this.actorLayer = null;
    this.scale = scale;

    parent.appendChild(this.el);
  }

  updateView(state: StateInterface) {
    let width = this.el.clientWidth;
    let height = this.el.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.el.scrollLeft,
      right = left + width;
    let top = this.el.scrollTop,
      bottom = top + height;

    let player = state.player;

    if (!player) {
      throw new Error("Player not found in level");
    }

    let center = player.position.plus(player.size.times(0.5)).times(this.scale);

    if (center.x < left + margin) {
      this.el.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.el.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.el.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.el.scrollTop = center.y + margin - height;
    }
  }

  syncState(state: StateInterface) {
    if (this.actorLayer) {
      this.actorLayer.remove();
    }

    this.actorLayer = drawActors(state.actors, this.scale);
    this.el.appendChild(this.actorLayer);
    this.el.className = `game ${state.status}`;
    this.updateView(state);
  }
}
