<template>
  <ul class="pagination">
    <li :class="['page-item', disabledPrevious && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="disabledPrevious ? '-1' : null"
        :aria-disabled="disabledPrevious ? 'true' : null"
        @click.prevent="setActive(dsPage !== 1 && dsPagecount !== 0 ? dsPage - 1 : dsPage)"
      >
        {{ datasetI18n.previous }}
      </a>
    </li>
    <template v-for="(item, index) in dsPages" :key="index">
      <li :class="['page-item', item === dsPage && 'active', item === morePages && 'disabled']">
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
        :tabindex="disabledNext ? '-1' : null"
        :aria-disabled="disabledNext ? 'true' : null"
        @click.prevent="setActive(dsPage !== dsPagecount && dsPagecount !== 0 ? dsPage + 1 : dsPage)"
      >
        {{ datasetI18n.next }}
      </a>
    </li>
  </ul>
</template>

<script>
import { MORE_PAGES } from './helpers'
import { computed, inject, ref } from 'vue'

export default {
  setup() {
    const morePages = ref(MORE_PAGES)
    const dsPage = inject('dsPage')
    const dsPagecount = inject('dsPagecount')

    const disabledPrevious = computed(() => dsPage.value === 1)
    const disabledNext = computed(() => dsPage.value === dsPagecount.value || dsPagecount.value === 0)

    return {
      datasetI18n: inject('datasetI18n'),
      setActive: inject('setActive'),
      dsPages: inject('dsPages'),
      dsPagecount,
      dsPage,
      morePages,
      disabledPrevious,
      disabledNext
    }
  }
}
</script>
