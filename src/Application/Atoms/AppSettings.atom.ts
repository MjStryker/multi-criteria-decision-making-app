import { atomWithStorage } from "jotai/utils";

export const AppSettingsAtoms = {
  advancedMode: atomWithStorage("app.advancedMode", false),
  autoRecompute: atomWithStorage("app.autoRecompute", true)
};
