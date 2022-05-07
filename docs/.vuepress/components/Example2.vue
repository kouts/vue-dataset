<template>
  <div>
    <!--
    <div class="row mb-4">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="updateData">Update data</button>
      </div>
    </div>
    -->
    <h3>Custom filters</h3>
    <div class="row mb-1">
      <div class="col-md-6 mb-2 mb-md-0">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="[onlineFilter === '' && 'active']"
            @click.prevent="onlineFilter = ''"
          >
            <span class="badge bg-white text-secondary">{{ users.length }}</span> All
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="[onlineFilter === 'Active' && 'active']"
            @click.prevent="onlineFilter = 'Active'"
          >
            <span class="badge bg-success text-white">{{ filterList(users, { onlineStatus: 'Active' }).length }}</span> Active
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="[onlineFilter === 'Away' && 'active']"
            @click.prevent="onlineFilter = 'Away'"
          >
            <span class="badge bg-warning text-white">{{ filterList(users, { onlineStatus: 'Away' }).length }}</span> Away
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="[onlineFilter === 'Do not disturb' && 'active']"
            @click.prevent="onlineFilter = 'Do not disturb'"
          >
            <span class="badge bg-danger text-white">{{ filterList(users, { onlineStatus: 'Do not disturb' }).length }}</span>
            Do not disturb
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="[onlineFilter === 'Invisible' && 'active']"
            @click.prevent="onlineFilter = 'Invisible'"
          >
            <span class="badge bg-secondary text-white">{{ filterList(users, { onlineStatus: 'Invisible' }).length }}</span>
            Invisible
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          placeholder="Name starts with"
          :value="startsWith"
          @input="startWithInput($event)"
        />
      </div>
    </div>
    <hr class="mb-1" />
    <h3>Sorting</h3>
    <div class="row mb-2">
      <div class="col-md-6 mb-2 mb-md-0">
        <button type="button" class="btn btn-outline-secondary" @click="firstNameAsc = !firstNameAsc">
          First name {{ firstNameAsc ? 'asc' : 'desc' }}
        </button>
      </div>
    </div>
    <hr />
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-filter-fields="{ onlineStatus: onlineFilter, name: startsWithFilter }"
      :ds-sortby="[sortFirstName]"
      :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteAnimal']"
      :ds-search-as="{ birthdate: searchAsEuroDate }"
    >
      <div class="row mb-2" :data-page-count="ds.dsPagecount">
        <div class="col-md-6 mb-2 mb-md-0">
          <dataset-show />
        </div>
        <div class="col-md-6">
          <dataset-search ds-search-placeholder="Search..." />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <dataset-item class="form-row mb-3" style="overflow-y: auto; max-height: 400px">
            <template #default="{ row, rowIndex }">
              <div class="col-md-4">
                <div class="card mb-2">
                  <div class="card-body pt-3 pb-2 px-3">
                    <h5 class="card-title text-truncate mb-2" :title="`Index: ${rowIndex}`">
                      <span :class="['font-16', statusClass[row.onlineStatus]]">⬤</span> {{ row.name }}
                    </h5>
                    <h6 class="card-subtitle text-truncate text-muted">{{ row.email }}</h6>
                    <p class="card-text text-truncate mb-0">{{ row.balance }}</p>
                    <p class="card-text text-truncate text-right">{{ isoDateToEuroDate(row.birthdate) }}</p>
                  </div>
                </div>
              </div>
            </template>
            <template #noDataFound>
              <div class="col-md-12 pt-2">
                <p class="text-center">No results found</p>
              </div>
            </template>
          </dataset-item>
        </div>
      </div>
      <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
        <dataset-info class="mb-2 mb-md-0" />
        <dataset-pager />
      </div>
    </dataset>
  </div>
</template>

<script>
import users from '@root/example-data/users.json'
import { clone, filterList, isoDateToEuroDate, searchAsEuroDate } from '../utilities'
import { debounce } from '@/helpers'

// const lessUsers = clone(data).slice(0, 2);

export default {
  name: 'Example2',
  data: function () {
    return {
      users,
      startsWith: '',
      onlineFilter: '',
      statusClass: {
        Active: 'text-success',
        Away: 'text-warning',
        'Do not disturb': 'text-danger',
        Invisible: 'text-secondary'
      },
      firstNameAsc: true
    }
  },
  computed: {
    sortFirstName() {
      return this.firstNameAsc ? 'firstName' : '-firstName'
    }
  },
  created() {
    this.startWithInput = debounce((e) => {
      this.startsWith = e.target.value
    }, 100)
  },
  methods: {
    filterList,
    isoDateToEuroDate,
    searchAsEuroDate,
    updateData() {
      const updatedUsers = clone(users).slice(5, 10)

      this.users = updatedUsers
    },
    startsWithFilter(value) {
      return value.toLowerCase().startsWith(this.startsWith.toLowerCase())
    }
  }
}
</script>

<style scoped>
.btn-group .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 10;
}
</style>
