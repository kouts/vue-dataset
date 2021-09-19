<template>
  <div class="form-inline">
    <label>{{ datasetI18n.show }}</label>
    <select :value="dsShowEntries" class="form-control mr-1 ml-1" @change="change">
      <option v-for="option in dsShowEntriesLovs" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <label>{{ datasetI18n.entries }}</label>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    dsShowEntries: {
      type: Number,
      default: 10
    },
    dsShowEntriesLovs: {
      type: Array,
      default: () => [
        { value: 5, text: 5 },
        { value: 10, text: 10 },
        { value: 25, text: 25 },
        { value: 50, text: 50 },
        { value: 100, text: 100 }
      ]
    }
  },
  emits: ['changed'],
  setup(props, { emit }) {
    const showEntries = inject('showEntries')

    const change = (e) => {
      emit('changed', Number(e.target.value))
      showEntries(Number(e.target.value))
    }

    showEntries(Number(props.dsShowEntries))

    return {
      datasetI18n: inject('datasetI18n'),
      change
    }
  }
}
</script>
