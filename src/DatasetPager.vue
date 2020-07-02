<template>
  <ul class="pagination">
    <li :class="['page-item', (ds.dsPage === 1 || ds.dsPagecount === 1) && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="(ds.dsPage === 1 || ds.dsPagecount === 1) && '-1'"
        :aria-disabled="(ds.dsPage === 1 || ds.dsPagecount === 1) && 'true'"
        @click.prevent="setActive(ds.dsPage !== 1 && ds.dsPagecount !== 0 ? ds.dsPage - 1 : ds.dsPage)"
      >
        {{ datasetI18n.previous }}
      </a>
    </li>
    <template v-for="(item, index) in ds.dsPages">
      <li :key="index" :class="['page-item', item === ds.dsPage && 'active', item === morePages && 'disabled']">
        <a v-if="item !== morePages" class="page-link" href="#" @click.prevent="setActive(item)">
          {{ item }}
        </a>
        <span v-else class="page-link">
          {{ item }}
        </span>
      </li>
    </template>
    <li :class="['page-item', (ds.dsPage === ds.dsPagecount || ds.dsPagecount === 1) && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="(ds.dsPage === ds.dsPagecount || ds.dsPagecount === 1) && '-1'"
        :aria-disabled="(ds.dsPage === ds.dsPagecount || ds.dsPagecount === 1) && 'true'"
        @click.prevent="setActive(ds.dsPage !== ds.dsPagecount && ds.dsPagecount !== 0 ? ds.dsPage + 1 : ds.dsPage)"
      >
        {{ datasetI18n.next }}
      </a>
    </li>
  </ul>
</template>

<script>
import { MORE_PAGES } from './helpers';

export default {
  inject: ['ds', 'datasetI18n', 'setActive'],
  data: function () {
    return {
      morePages: MORE_PAGES
    };
  }
};
</script>
