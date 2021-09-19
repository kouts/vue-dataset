import { defineClientAppEnhance } from '@vuepress/client'
import VueExample from './VueExample.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('VueExample', VueExample)
})
