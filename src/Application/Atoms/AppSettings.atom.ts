import { atomWithStorage } from "jotai/utils";

export const AppSettingsAtoms = {
  debugMode: atomWithStorage("app.debugMode", false),
  // advancedMode: atomWithStorage("app.advancedMode", false),
  autoRecompute: atomWithStorage("app.autoRecompute", true)
};
