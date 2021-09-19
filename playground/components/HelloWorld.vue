<template>
  <div class="row">
    <div class="col text-center">
      <h1 class="msg">{{ msg }}</h1>
      <p>
        A project setup using vue-cli, created to easily scaffold new Vue.js projects.<br />
        Find out more at
        <a class="custom" href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
h1.msg {
  color: $gray-900;
}
</style>
