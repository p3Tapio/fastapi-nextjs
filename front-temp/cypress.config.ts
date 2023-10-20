import { defineConfig } from 'cypress'

declare var require: any // TODO ???

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config)
      return config
      // implement node event listeners here
      // on('after:run', (results) => {
      // })
    },
  },
})
