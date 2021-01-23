<template>
  <ul class="pagination">
    <li :class="['page-item', (dsPage === 1 || dsPagecount === 1) && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="(dsPage === 1 || dsPagecount === 1) && '-1'"
        :aria-disabled="(dsPage === 1 || dsPagecount === 1) && 'true'"
        @click.prevent="setActive(dsPage !== 1 && dsPagecount !== 0 ? dsPage - 1 : dsPage)"
      >
        {{ datasetI18n.previous }}
      </a>
    </li>
    <template v-for="(item, index) in dsPages">
      <li :key="index" :class="['page-item', item === dsPage && 'active', item === morePages && 'disabled']">
        <a v-if="item !== morePages" class="page-link" href="#" @click.prevent="setActive(item)">
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
        @click.prevent="setActive(dsPage !== dsPagecount && dsPagecount !== 0 ? dsPage + 1 : dsPage)"
      >
        {{ datasetI18n.next }}
      </a>
    </li>
  </ul>
</template>

<script>
import { MORE_PAGES } from './helpers';

export default {
  inject: ['datasetI18n', 'setActive', 'rdsPages', 'rdsPagecount', 'rdsPage'],
  data: function () {
    return {
      morePages: MORE_PAGES
    };
  },
  computed: {
    /* Setup reactive injects */
    dsPages () {
      return this.rdsPages();
    },
    dsPagecount () {
      return this.rdsPagecount();
    },
    dsPage () {
      return this.rdsPage();
    }
  }
};
</script>
