<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        {{ users }}
      </div>
    </div>
  </div>
</template>

<script>
// https://next.json-generator.com/4JvxrAE2O
import data from '../data/exampleData.json';

export default {
  name: 'Example1',
  data: function () {
    return {
      users: data
    };
  }
};
</script>
