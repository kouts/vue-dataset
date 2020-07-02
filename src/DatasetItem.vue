<template>
  <component :is="tag">
    <template v-for="item in ds.dsRows">
      <slot :row="ds.dsData[item]" :rowIndex="item"></slot>
    </template>
    <slot v-if="!ds.dsRows.length" name="noDataFound"></slot>
  </component>
</template>

<script>
export default {
  inject: ['ds'],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
};
</script>
