<template>
  <div id="app">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script>
import './scss/app.scss'

export default {
  name: 'App',
  computed: {
    layout() {
      return `layout-${this.$route.meta.layout || 'default'}`
    },
  },
}
</script>
