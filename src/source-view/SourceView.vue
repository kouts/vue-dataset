<template>
  <div class="mb-4">
    <ul class="nav nav-tabs">
      <li v-for="section in sections" :key="section" class="nav-item" @click.prevent="sectionSelected = section">
        <a :class="['nav-link', section === sectionSelected && 'active']" href="#">{{ section }}</a>
      </li>
    </ul>
    <template v-for="section in sections">
      <div v-if="sectionSelected === section" :key="section" class="pt-2">
        {{ pen[section] }}
      </div>
    </template>
    <div v-if="sectionSelected === 'example'" class="pt-2">
      <component :is="component" v-if="component" v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import Codepen from './codepen';

export default {
  name: 'SourceView',
  mixins: [Codepen],
  props: {
    file: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      component: undefined,
      sectionSelected: 'example'
    };
  },
  computed: {
    sections () {
      if (!this.pen) {
        return [];
      }
      return [
        'example',
        'template',
        'script',
        'style'
      ].filter(section => {
        return section === 'example' || this.pen[section];
      });
    }
  },
  created () {
    this.importTemplate();
    import(/* webpackChunkName: "examples" */ /* webpackMode: "lazy-once" */ `../../docs/.vuepress/components/${this.file}.vue`).then(component => {
      this.component = component.default;
    })
  }
};
</script>

<style lang="scss" scoped>
.nav-tabs .nav-item > a.nav-link:hover {
  text-decoration: none;
}
</style>
