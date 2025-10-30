import * as components from './components';
import * as composables from './composables';

export * from './components';
export * from './composables';

export default {
  install: (app: any) => {
    for (const key in components) {
      app.component(key, (components as any)[key]);
    }
  },
};
