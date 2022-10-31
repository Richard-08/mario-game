import { runGame } from "./game";
import { DOMDisplay } from "./DOMDisplay";
import LEVELS from "./levels";

runGame(document.body, LEVELS, DOMDisplay);
