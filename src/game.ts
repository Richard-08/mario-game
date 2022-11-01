import { runAnimation } from "./utils";
import {
  LevelInterface,
  TrackKeysType,
  EventKeysType,
  Constructable,
} from "./types";
import { StatusEnums } from "./enums";
import { State } from "./State";
import { Level } from "./Level";
import { DisplayInterface } from "./DOMDisplay";
import { EVENT_KEYS } from "./constants";
import { CONFIG } from "./config";
import type { LevelType } from "./levels";

function trackKeys(keys: EventKeysType) {
  let down = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

function runLevel(
  root: HTMLElement,
  level: LevelInterface,
  Display: Constructable<DisplayInterface>,
  eventKeys: TrackKeysType
) {
  let display = new Display(root, level, CONFIG.scale);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    runAnimation((time: number) => {
      state = state.update(time, eventKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

export async function runGame(
  root: HTMLElement,
  levels: LevelType[],
  Display: Constructable<DisplayInterface>
) {
  let lives = CONFIG.lives;

  let dom = document.createElement("div");
  dom.classList.add("lives");
  dom.textContent = `${lives}`;
  root.append(dom);

  const keys = trackKeys(EVENT_KEYS);

  let styles = document.querySelector("link");

  for (let level = 0; level < levels.length && lives > 0; ) {
    if (styles) {
      styles.attributes[1].nodeValue = `./src/assets/styles/${levels[level].styles}`;
    }

    let status = await runLevel(
      root,
      new Level(levels[level].scheme),
      Display,
      keys
    );

    if (status == StatusEnums.WON) {
      level++;
    } else {
      lives -= 1;
    }

    dom.textContent = `${lives}`;
  }
  if (lives > 0) {
    alert("You've won! 🕺");
  } else {
    alert("Game over 💩");
  }
}
