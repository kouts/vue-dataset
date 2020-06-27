<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="updateData">Update data</button>
      </div>
    </div>
    <h3>Custom filters</h3>
    <div class="row mb-2">
      <div class="col">
        <div class="btn-group">
          <button type="button" class="btn btn-outline-secondary" :class="[onlineFilter === '' && 'active']" @click.prevent="onlineFilter = ''">
            <span class="badge bg-white text-secondary">{{ users.length }}</span> All
          </button>
          <button type="button" class="btn btn-outline-secondary" :class="[onlineFilter === 'Active' && 'active']" @click.prevent="onlineFilter = 'Active'">
            <span class="badge bg-success text-white">{{ filterList(users, {'onlineStatus': 'Active'}).length }}</span> Active
          </button>
          <button type="button" class="btn btn-outline-secondary" :class="[onlineFilter === 'Away' && 'active']" @click.prevent="onlineFilter = 'Away'">
            <span class="badge bg-warning text-white">{{ filterList(users, {'onlineStatus': 'Away'}).length }}</span> Away
          </button>
          <button type="button" class="btn btn-outline-secondary" :class="[onlineFilter === 'Do not disturb' && 'active']" @click.prevent="onlineFilter = 'Do not disturb'">
            <span class="badge bg-danger text-white">{{ filterList(users, {'onlineStatus': 'Do not disturb'}).length }}</span> Do not disturb
          </button>
          <button type="button" class="btn btn-outline-secondary" :class="[onlineFilter === 'Invisible' && 'active']" @click.prevent="onlineFilter = 'Invisible'">
            <span class="badge bg-secondary text-white">{{ filterList(users, {'onlineStatus': 'Invisible'}).length }}</span> Invisible
          </button>
        </div>
      </div>
      <div class="col">
        <input v-model="startsWith" type="text" class="form-control" placeholder="Name starts with">
      </div>
    </div>
    <hr />
    <dataset
      v-slot="{ds}"
      :ds-data="users"
      :ds-filter-fields="{onlineStatus: onlineFilter, name: startsWithFilter}"
      :ds-sortby="['name']"
      :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteAnimal']"
      :ds-search-as="{}"
    >
      <div class="row mb-2">
        <div class="col-sm-6">
          <dataset-show />
        </div>
        <div class="col-sm-6">
          <dataset-search ds-search-placeholder="Search..." />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <dataset-item :ds-data="ds.dsData" :ds-rows="ds.dsRows" class="form-row">
            <template v-slot="{row, rowIndex}">
              <div class="col-sm-4">
                <div class="card mb-2">
                  <div class="card-body">
                    <h4 class="card-title text-truncate mb-2" :title="`Index: ${ rowIndex }`">
                      <span :class="['font-16', statusClass[row.onlineStatus]]">⬤</span> {{ row.name }}
                    </h4>
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
          </dataset-item>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <dataset-info :ds-results-number="ds.dsResultsNumber" :ds-from="ds.dsFrom" :ds-to="ds.dsTo" />
        <dataset-pager :ds-pages="ds.dsPages" :ds-pagecount="ds.dsPagecount" :ds-page="ds.dsPage" />
      </div>
    </dataset>
  </div>
</template>

<script>
// https://next.json-generator.com/4JvxrAE2O
import data from '../data/exampleData.json';
import { filterList, clone } from '../utilities';

const users = data;
// const users = clone(data).slice(0, 2);

export default {
  name: 'Example1',
  data: function () {
    return {
      startsWith: '',
      showEntries: 5,
      users: users,
      statusClass: {
        Active: 'text-success',
        Away: 'text-warning',
        'Do not disturb': 'text-danger',
        Invisible: 'text-secondary'
      },
      onlineFilter: ''
    };
  },
  methods: {
    filterList,
    updateData () {
      const updatedUsers = clone(users).slice(5, 10);
      this.users = updatedUsers;
    },
    startsWithFilter (value) {
      // console.log(this.startsWith);
      return value.toLowerCase().startsWith(this.startsWith.toLowerCase());
    }
  }
};
</script>
