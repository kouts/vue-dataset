<template>
  <ul class="pagination">
    <li :class="['page-item', disabledPrevious && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="disabledPrevious && '-1'"
        :aria-disabled="disabledPrevious && 'true'"
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
    <li :class="['page-item', disabledNext && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="disabledNext && '-1'"
        :aria-disabled="disabledNext && 'true'"
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
    },
    /* Normal computeds */
    disabledPrevious () {
      return this.dsPage === 1;
    },
    disabledNext () {
      return this.dsPage === this.dsPagecount || this.dsPagecount === 0;
    }
  }
};
</script>
