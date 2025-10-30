import * as components from './components';

export * from './components';
export * from './composables';

export default {
  install: (app: any) => {
    for (const key in components) {
      app.component(key, (components as any)[key]);
    }
  },
};
