<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container">
      <RouterLink to="/" class="navbar-brand" @click="collapseNavbar">Playground</RouterLink>
      <button
        :class="['navbar-toggler', !navbarExpanded && 'collapsed']"
        type="button"
        aria-controls="navbarDefault"
        :aria-expanded="navbarExpanded"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarDefault" :class="['collapse navbar-collapse', navbarExpanded && 'show']">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" @click="collapseNavbar">Options API</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/composition-api" class="nav-link" @click="collapseNavbar">Composition API</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'LayoutDefaultNav',
  data() {
    return {
      navbarExpanded: false,
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarExpanded = !this.navbarExpanded
    },
    collapseNavbar() {
      this.navbarExpanded = false
    },
  },
}
</script>
