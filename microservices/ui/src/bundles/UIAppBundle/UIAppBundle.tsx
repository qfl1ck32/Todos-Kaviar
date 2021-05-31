import { XRouter, XUIBundle } from "@kaviar/x-ui";
import { Routes } from "./";
import * as ComponentOverrides from "./overrides";
import { Bundle } from "@kaviar/core";

export class UIAppBundle extends Bundle {
  async init() {
    // All routes are added via service
    const router = this.container.get(XRouter);
    const xuiBundle = this.container.get(XUIBundle);

    router.add(Routes);
    xuiBundle.updateComponents(ComponentOverrides);
  }
}
