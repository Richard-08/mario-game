import { Actor } from "../types";

export function overlap(actor1: Actor, actor2: Actor): boolean {
  return (
    actor1.position.x + actor1.size.x > actor2.position.x &&
    actor1.position.x < actor2.position.x + actor2.size.x &&
    actor1.position.y + actor1.size.y > actor2.position.y &&
    actor1.position.y < actor2.position.y + actor2.size.y
  );
}
