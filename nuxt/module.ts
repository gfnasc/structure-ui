import { defineNuxtModule, addComponentsDir, addImportsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'structure-ui',
    configKey: 'structureUi',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Auto-import components
    addComponentsDir({
      path: resolver.resolve('../src/components'),
      pathPrefix: false,
      prefix: 'St',
      global: true,
    })

    // Auto-import composables
    addImportsDir(resolver.resolve('../src/composables'))

    // Inject CSS
    nuxt.options.css.push(resolver.resolve('../src/styles/main.css'))
  },
})
