<template>
  <div :class="'language-' + language">
    <pre ref="code" :class="'language-' + language"></pre>
  </div>
</template>

<script>
import Prism from 'prismjs'

export default {
  name: 'VueExampleHighlight',
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  mounted: function () {
    const code = document.createElement('code')
    code.innerHTML = Prism.highlight(this.$props.code, Prism.languages[this.$props.language], this.$props.language)
    this.$refs.code.appendChild(code)
  }
}
</script>

<style lang="scss" scoped>
pre[class*='language-'] {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
