<template>
  <input
    type="text"
    :placeholder="dsSearchPlaceholder"
    class="form-control"
    :value="dsSearch"
    @input="input($event.target.value)"
  />
</template>

<script setup>
import { debounce } from './helpers'
import { inject, ref } from 'vue'

const props = defineProps({
  dsSearchPlaceholder: {
    type: String,
    default: ''
  },
  wait: {
    type: Number,
    default: 0
  }
})

const search = inject('search')
const dsSearch = ref('')

// create debounced function
const input = debounce((value) => {
  search(value)
}, props.wait)
</script>
