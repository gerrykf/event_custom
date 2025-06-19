import type { App } from "vue";
import { createPinia } from "pinia";

export * from "./app";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
