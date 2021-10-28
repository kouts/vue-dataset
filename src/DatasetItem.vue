<template>
  <component :is="tag">
    <template v-for="(rowIndex, i) in dsRows">
      <slot :row="dsData[rowIndex]" :rowIndex="rowIndex" :index="indexes[i]"></slot>
    </template>
    <slot v-if="!dsRows.length" name="noDataFound"></slot>
  </component>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup() {
    const indexes = computed(() => {
      const arr = []
      for (let i = inject('dsFrom').value; i < inject('dsTo').value; i++) {
        arr.push(i)
      }
      return arr
    })

    return {
      dsData: inject('dsData'),
      dsRows: inject('dsRows'),
      indexes
    }
  }
}
</script>
