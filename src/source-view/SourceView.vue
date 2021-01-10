<template>
  <div class="mb-4">
    <ul class="nav nav-tabs">
      <li v-for="section in sections" :key="section" class="nav-item" @click.prevent="sectionSelected = section">
        <a :class="['nav-link', section === sectionSelected && 'active']" href="#">{{ section }}</a>
      </li>
    </ul>
    <div v-if="pen">
      <template v-for="section in sections">
        <div v-if="sectionSelected === section && section !== 'example'" :key="section" class="pt-2">
          <highlight :key="section" :code="pen[section]" :language="sectionLanguage[section]" />
        </div>
      </template>
    </div>
    <div v-if="sectionSelected === 'example'" class="pt-2">
      <component :is="component" v-if="component" v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import Codepen from './codepen';
import Highlight from './Highlight';

export default {
  name: 'SourceView',
  components: {
    Highlight
  },
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
      sectionSelected: 'example',
      sectionLanguage: {
        template: 'markup',
        script: 'javascript',
        style: 'css'
      }
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
    import('../../docs/.vuepress/components/' + this.file + '.vue').then(component => {
      this.component = component.default;
    });
  }
};
</script>

<style lang="scss" scoped>
.nav-tabs .nav-item > a.nav-link:hover {
  text-decoration: none;
}
</style>
