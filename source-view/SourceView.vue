<template>
  <div class="mb-4">
    <ul class="nav nav-tabs">
      <li v-for="section in sections" :key="section.name" class="nav-item" @click.prevent="sectionSelected = section.name">
        <a :class="['nav-link', section.name === sectionSelected && 'active']" href="#">{{ section.name }}</a>
      </li>
    </ul>
    <div>
      <template v-for="section in sections">
        <div v-if="sectionSelected === section.name && section.name !== 'Example'" :key="section.name" class="pt-2">
          <highlight :code="section.contents" :language="section.language" />
        </div>
      </template>
    </div>
    <div v-if="sectionSelected === 'Example'" class="pt-2">
      <component :is="component" v-if="component" v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import Highlight from './Highlight';

export default {
  name: 'SourceView',
  components: {
    Highlight
  },
  props: {
    file: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      component: undefined,
      sections: [],
      sectionSelected: 'Example'
    };
  },
  created () {
    this.createSections();
    this.loadComponent();
  },
  methods: {
    async createSections () {
      try {
        const sfc = await import(/* webpackChunkName: "examples-source" */ /* webpackMode: "lazy-once" */ '!raw-loader!/docs/.vuepress/components/' + this.file + '.vue');
        const contents = sfc.default;
        const sections = [];
        sections.push({ name: 'Example', contents: 'N/A', language: 'N/A' });
        sections.push({ name: 'Template', contents: this.parseSfcSection('template', contents), language: 'markup' });
        sections.push({ name: 'Style', contents: this.parseSfcSection('style', contents), language: 'javascript' });
        sections.push({ name: 'Script', contents: this.parseSfcSection('script', contents), language: 'css' });
        this.sections = sections.filter(s => s.contents);
      } catch (err) {
        console.log(err);
      }
    },
    parseSfcSection (tag, contents) {
      const string = `(<${tag}(.*)?>[\\w\\W]*<\\/${tag}>)`;
      const regex = new RegExp(string, 'g');
      const parsed = regex.exec(contents) || [];
      return parsed[1] || '';
    },
    loadComponent () {
      try {
        import('/docs/.vuepress/components/' + this.file + '.vue').then(component => {
          this.component = component.default;
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-tabs .nav-item > a.nav-link:hover {
  text-decoration: none;
}
</style>
