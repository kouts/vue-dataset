<template>
  <ul class="pagination">
    <li :class="['page-item', (dsPage === 1 || dsPagecount === 1) && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="(dsPage === 1 || dsPagecount === 1) && '-1'"
        :aria-disabled="(dsPage === 1 || dsPagecount === 1) && 'true'"
        @click.prevent="setActive(dsPage !== 1 && dsPagecount !== 0 ? dsPage-1 : dsPage)"
      >
        {{ datasetI18n.previous }}
      </a>
    </li>
    <template v-for="(item, index) in dsPages">
      <li :key="index" :class="['page-item', item === dsPage && 'active', item === '...' && 'disabled']">
        <a v-if="item !=='...'" class="page-link" href="#" @click.prevent="setActive(item)">
          {{ item }}
        </a>
        <span v-else class="page-link">
          {{ item }}
        </span>
      </li>
    </template>
    <li :class="['page-item', (dsPage === dsPagecount || dsPagecount === 1) && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="(dsPage === dsPagecount || dsPagecount === 1) && '-1'"
        :aria-disabled="(dsPage === dsPagecount || dsPagecount === 1) && 'true'"
        @click.prevent="setActive(dsPage !== dsPagecount && dsPagecount !== 0 ? dsPage+1 : dsPage)"
      >
        {{ datasetI18n.next }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['datasetI18n', 'setActive'],
  props: {
    dsPages: {
      type: Array,
      default: () => []
    },
    dsPagecount: {
      type: Number,
      default: 0
    },
    dsPage: {
      type: Number,
      default: 1
    }
  }
};
</script>
