<template>
  <div class="dataTables_paginate paging_simple_numbers">
    <a
      :class="['paginate_button previous', (dsPage == 1 || dsPagecount == 1) && 'disabled']"
      tabindex="0" @click.prevent="setActive(dsPage != 1 && dsPagecount != 0 ? dsPage-1 : dsPage )"
    >
      {{ datasetI18n.previous }}
    </a>
    <span>
      <template v-for="(item, index) in dsPages">
        <span v-if="item == ''" :key="index" class="ellipsis">…</span>
        <a
          v-else
          :key="index"
          :class="['paginate_button', item == dsPage && 'current']"
          tabindex="0"
          @click.prevent="setActive(item)"
        >
          {{ item }}
        </a>
      </template>
    </span>
    <a
      :class="['paginate_button next', (dsPage == dsPagecount || dsPagecount == 1) && 'disabled']"
      tabindex="0" @click.prevent="setActive(dsPage != dsPagecount && dsPagecount != 0 ? dsPage+1 : dsPage )"
    >
      {{ datasetI18n.next }}
    </a>
  </div>
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
