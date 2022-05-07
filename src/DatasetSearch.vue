<template>
  <input
    type="text"
    :placeholder="dsSearchPlaceholder"
    class="form-control"
    :value="dsSearch"
    @input="input($event.target.value)"
  />
</template>

<script>
import { debounce } from './helpers'
import { inject, ref } from 'vue'

export default {
  props: {
    dsSearchPlaceholder: {
      type: String,
      default: ''
    },
    wait: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const search = inject('search')
    const dsSearch = ref('')

    const input = debounce((value) => {
      search(value)
    }, props.wait)

    return {
      dsSearch,
      input
    }
  }
}
</script>
