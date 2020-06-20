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
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dsData: {
      type: Array,
      default: () => []
    },
    dsRows: {
      type: Array,
      default: () => []
    }
  }
};
</script>
