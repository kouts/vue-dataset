<template>
  <input type="text" :placeholder="dsSearchPlaceholder" class="form-control" :value="dsSearch" @input="search($event.target.value)" />
</template>

<script>
export default {
  inject: ['search'],
  props: {
    dsSearchPlaceholder: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      dsSearch: ''
    };
  }
};
</script>
