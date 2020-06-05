<template>
  <div class="input-group dataset-filters">
    <input type="text" :placeholder="dsSearchPlaceholder" class="form-control" :value="dsSearch" @input="search($event.target.value)" />
    <div v-popper="{placement: 'bottom-end', clickToClose: false}" class="input-group-append">
      <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" popper-trigger><i class="fas fa-cog fs11"></i></button>
      <div class="dropdown-menu" popper>
        <form class="form-inline">
          <div class="clearfix pr-2 pl-2">
            <label class="d-inline-block">{{ $t('otr.show') }}</label>
            <select class="form-control d-inline-block" :value="dsShowEntries" style="float: none;" @change="showEntries(Number($event.target.value))">
              <option v-for="option in dsShowEntriesLovs" :key="option.value" :value="option.value">{{ option.text }}</option>
            </select>
            <label class="d-inline-block">{{ $t('otr.entries') }}</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['search', 'showEntries'],
  props: {
    dsSearchPlaceholder: {
      type: String,
      default: ''
    },
    dsShowEntries: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      dsSearch: '',
      dsShowEntriesLovs: [{ value: 5, text: 5 }, { value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]
    };
  }
};
</script>
