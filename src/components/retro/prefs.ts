import { createStore } from "./store";

// Single-letter shortcuts can be switched off (WCAG 2.1.4), e.g. for speech input.
// Shared by the menu and the mini-game.
export const letterKeys = createStore("letter-keys", true);
