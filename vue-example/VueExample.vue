<template>
  <div class="mb-4">
    <div v-if="sections.length" class="d-flex justify-content-between">
      <ul class="nav nav-pills">
        <li class="nav-item" @click.prevent="sectionSelected = sections[0].name">
          <a href="#" :class="['nav-link', sectionSelected === sections[0].name && 'active']">
            {{ title ? title : sections[0].name }}
          </a>
        </li>
      </ul>
      <ul class="nav nav-pills justify-content-end">
        <li v-for="(section, i) in sections" :key="section.name" class="nav-item" @click.prevent="sectionSelected = section.name">
          <a v-if="i !== 0" href="#" :class="['nav-link', section.name === sectionSelected && 'active']">
            {{ section.name }}
          </a>
        </li>
      </ul>
    </div>
    <div>
      <template v-for="section in sections">
        <div v-if="sectionSelected === section.name && section.name !== 'Example'" :key="section.name" class="pt-2">
          <vue-example-highlight :code="section.contents" :language="section.language" />
        </div>
      </template>
    </div>
    <div v-if="sectionSelected === 'Example'" class="pt-2">
      <component :is="component" v-if="component" v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import { loadComponent, loadComponentAsString } from '@dynamic/loadComponent';
import VueExampleHighlight from './VueExampleHighlight';

export default {
  name: 'SourceView',
  components: {
    VueExampleHighlight
  },
  props: {
    file: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
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
    this.createComponent();
    this.createSections();
  },
  methods: {
    createComponent () {
      loadComponent(this.$props.file).then(component => { this.component = component; });
    },
    createSections () {
      loadComponentAsString(this.$props.file).then(contents => {
        const sections = [];
        sections.push({ name: 'Example', contents: 'N/A', language: 'N/A' });
        sections.push({ name: 'Template', contents: this.parseSfcSection('template', contents), language: 'markup' });
        sections.push({ name: 'Script', contents: this.parseSfcSection('script', contents), language: 'css' });
        sections.push({ name: 'Style', contents: this.parseSfcSection('style', contents), language: 'javascript' });
        this.sections = sections.filter(s => s.contents);
      });
    },
    parseSfcSection (tag, contents) {
      const string = `(<${tag}(.*)?>[\\w\\W]*<\\/${tag}>)`;
      const regex = new RegExp(string, 'g');
      const parsed = regex.exec(contents) || [];
      return parsed[1] || '';
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-item > a.nav-link:hover {
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
</style>
