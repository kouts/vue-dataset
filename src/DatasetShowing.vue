<template>
  <div class="dataTables_info">
    {{ $t('otr.showing') }} {{ dsResultsNumber != 0 ? dsFrom + 1 : 0 }}
    {{ $t('otr.showing_to') }} {{ dsTo >= dsResultsNumber ? dsResultsNumber : dsTo }}
    {{ $t('otr.showing_of') }} {{ dsResultsNumber }} {{ $t('otr.showing_entries') }}
  </div>
</template>

<script>
export default {
  props: {
    dsResultsNumber: {
      type: Number,
      default: 0
    },
    dsFrom: {
      type: Number,
      default: 0
    },
    dsTo: {
      type: Number,
      default: 0
    }
  }
};
</script>
