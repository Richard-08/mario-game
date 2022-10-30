import { Actor, LevelInterface } from "../types";

export function overlap(actor1: Actor, actor2: Actor): boolean {
  return (
    actor1.position.x + actor1.size.x > actor2.position.x &&
    actor1.position.x < actor2.position.x + actor2.size.x &&
    actor1.position.y + actor1.size.y > actor2.position.y &&
    actor1.position.y < actor2.position.y + actor2.size.y
  );
}

export function createElement(
  name: string,
  attrs: { [key: string]: string },
  ...children: HTMLElement[]
) {
  let dom = document.createElement(name) as HTMLElement;
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

export function drawGrid(level: LevelInterface, scale: number) {
  return createElement(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      createElement(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => createElement("td", { class: type }))
      )
    )
  );
}

export function drawActors(actors: Actor[], scale: number) {
  return createElement(
    "div",
    {},
    ...actors.map((actor: Actor) => {
      let rect = createElement("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.position.x * scale}px`;
      rect.style.top = `${actor.position.y * scale}px`;
      return rect;
    })
  );
}

export function runAnimation(frameFunc: Function) {
  let lastTime: number | null = null;

  function frame(time: number) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;

      if (frameFunc(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
