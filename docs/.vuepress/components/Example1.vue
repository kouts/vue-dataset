<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        This is the first {{ name }}!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example1',
  data: function () {
    return {
      name: 'example updated test!'
    };
  }
};
</script>
