<template>
  <div class="card mb-4">
    <div v-if="sections.length" class="card-header d-flex bg-white justify-content-between">
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
            <svg v-if="section.name === 'Template'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
            <svg v-if="section.name === 'Script'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-text" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <svg v-if="section.name === 'Style'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-code" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M10 13l-1 2l1 2" />
              <path d="M14 13l1 2l-1 2" />
            </svg>
            {{ section.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <template v-for="section in sections">
        <div v-if="sectionSelected === section.name && section.name !== 'Example'" :key="section.name">
          <vue-example-highlight :code="section.contents" :language="section.language" />
        </div>
      </template>
      <template v-if="sectionSelected === 'Example'">
        <slot></slot>
        <component :is="component" v-if="component" v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
      </template>
    </div>
  </div>
</template>

<script>
// SVG icons from // https://tablericons.com/
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
    },
    stripComments: {
      type: Boolean,
      default: true
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
        sections.push({ name: 'Script', contents: this.parseSfcSection('script', contents), language: 'javascript' });
        sections.push({ name: 'Style', contents: this.parseSfcSection('style', contents), language: 'css' });
        this.sections = sections.filter(s => s.contents);
      });
    },
    parseSfcSection (tag, contents) {
      const string = `(<${tag}(.*)?>[\\w\\W]*<\\/${tag}>)`;
      const regex = new RegExp(string, 'g');
      const parsed = regex.exec(contents) || [];
      const str = parsed[1] || '';
      return this.stripComments ? this.removeComments(tag, str) : str;
    },
    removeComments (tag, str) {
      if (tag === 'template') {
        str = str.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g, '');
        // Remove all extra line breaks
        str = str.replace(/^\s*[\r\n]/gm, '');
      }
      if (tag === 'script') {
        str = str.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
        // Remove more than one line breaks
        const EOL = str.match(/\r\n/gm) ? '\r\n' : '\n';
        const regExp = new RegExp('(' + EOL + '){3,}', 'gm');
        str = str.replace(regExp, EOL + EOL);
      }
      if (tag === 'style') {
        str = str.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
        // Remove all extra line breaks
        str = str.replace(/^\s*[\r\n]/gm, '');
      }
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-item > a.nav-link:hover {
  text-decoration: none;
  border-bottom: none;
}
.nav-item a svg {
  stroke: #3eaf7c;
  margin-top: -2px;
}
.nav-item a.active svg {
  stroke: #fff;
}
</style>
