<template>
  <div>
    <template v-for="item in dsRows">
      <slot :row="dsData[item]" :rowIndex="item"></slot>
    </template>
    <slot v-if="!dsRows.length" name="noDataFound"></slot>
  </div>
</template>

<script>
export default {
  props: {
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
