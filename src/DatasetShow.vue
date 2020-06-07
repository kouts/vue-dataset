<template>
  <div class="form-inline">
    <label>{{ datasetI18n.show }}</label>
    <select class="form-control mr-1 ml-1" :value="dsShowEntries" @change="showEntries(Number($event.target.value))">
      <option v-for="option in dsShowEntriesLovs" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <label>{{ datasetI18n.entries }}</label>
  </div>
</template>

<script>
export default {
  inject: ['datasetI18n', 'showEntries'],
  props: {
    dsShowEntries: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      dsShowEntriesLovs: [{ value: 5, text: 5 }, { value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]
    };
  }
};
</script>
