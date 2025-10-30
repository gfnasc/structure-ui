import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'structure-ui',
    configKey: 'structureUi',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the plugin if Nuxt is running in development mode
    // if (nuxt.options.dev) {
    //   return
    // }

    addPlugin(resolver.resolve('./plugin.server.ts'))
  },
})
