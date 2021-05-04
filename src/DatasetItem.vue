<template>
  <component :is="tag">
    <template v-for="item in dsRows">
      <slot :row="dsData[item]" :rowIndex="item"></slot>
    </template>
    <slot v-if="!dsRows.length" name="noDataFound"></slot>
  </component>
</template>

<script>
export default {
  inject: ['rdsData', 'rdsRows'],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    /* Setup reactive injects */
    dsRows() {
      return this.rdsRows()
    },
    dsData() {
      return this.rdsData()
    }
  }
}
</script>
