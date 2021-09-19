<template>
  <component :is="tag">
    <template v-for="item in dsRows">
      <slot :row="dsData[item]" :rowIndex="item"></slot>
    </template>
    <slot v-if="!dsRows.length" name="noDataFound"></slot>
  </component>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup() {
    return {
      dsData: inject('dsData'),
      dsRows: inject('dsRows')
    }
  }
}
</script>
