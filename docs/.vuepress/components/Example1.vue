<template>
  <dataset
    v-slot="{ds}"
    :ds-data="users"
    :ds-filter-fields="{}"
    :ds-sortby="''"
    :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteFruit']"
    :ds-search-as="{}"
  >
    <div class="row mb-2">
      <div class="col-sm-6">
        <dataset-show :ds-show-entries="ds.dsShowEntries" />
      </div>
      <div class="col-sm-6">
        <dataset-search ds-search-placeholder="Custom placeholder text..." />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <dataset-div :ds-data="ds.dsData" :ds-rows="ds.dsRows" class="form-row">
          <template v-slot="{row, rowIndex}">
            <div class="col-sm-4">
              <div class="card mb-2">
                <div class="card-body">
                  <h4 class="card-title text-truncate mb-2" :title="`Index: ${ rowIndex }`">{{ row.name }}</h4>
                  <h6 class="card-subtitle text-truncate mb-2 text-muted">{{ row.email }}</h6>
                  <p class="card-text text-truncate mb-0">{{ row.balance }}</p>
                  <p class="card-text text-truncate mb-1 text-right">{{ row.birthdate }}</p>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:noDataFound>
            <div class="col-sm-12 pt-2">
              <p class="text-center">No results found</p>
            </div>
          </template>
        </dataset-div>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-between">
      <dataset-info :ds-results-number="ds.dsResultsNumber" :ds-from="ds.dsFrom" :ds-to="ds.dsTo" />
      <dataset-pager :ds-pages="ds.dsPages" :ds-pagecount="ds.dsPagecount" :ds-page="ds.dsPage" />
    </div>
  </dataset>
</template>

<script>
// https://next.json-generator.com/4JvxrAE2O
import data from '../data/exampleData.json';

export default {
  name: 'Example1',
  data: function () {
    return {
      users: data
    };
  },
  methods: {
    testMethod () {
      // noop
    }
  }
};
</script>
