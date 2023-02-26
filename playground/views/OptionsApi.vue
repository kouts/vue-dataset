<template>
  <div class="container">
    <div><h3>Options API</h3></div>
    <div class="mt-3 mb-3">
      <button type="button" class="btn btn-primary ml-1" @click="setData1">Set users 1</button>
      <button type="button" class="btn btn-primary ml-1" @click="setData2">Set users 2</button>
      <button type="button" class="btn btn-primary ml-1" @click="setDataAll">Set users all</button>
      <button type="button" class="btn btn-primary ml-1" @click="addOne">Add one user</button>
      <button type="button" class="btn btn-primary ml-1" @click="removeOne">Remove one user</button>
    </div>
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-filter-fields="{}"
      :ds-sortby="['name']"
      :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteAnimal']"
      :ds-search-as="{}"
      @update:ds-data="updateDsData"
    >
      <div class="row mb-2" :data-page-count="ds.dsPagecount">
        <div class="col-md-6 mb-2 mb-md-0">
          <dataset-show :ds-show-entries="selected" @changed="selected = $event" />
        </div>
        <div class="col-md-6">
          <dataset-search ds-search-placeholder="Search..." />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <dataset-item class="form-row mb-3">
            <template #default="{ row, rowIndex }">
              <div class="col-md-4">
                <div class="card mb-2">
                  <div class="card-body pt-3 pb-2 px-3">
                    <h5 class="card-title text-truncate mb-2" :title="`Index: ${rowIndex}`">
                      <span :class="['font-16', statusClass[row.onlineStatus]]">⬤</span> {{ row.name }}
                    </h5>
                    <h6 class="card-subtitle text-truncate text-muted">{{ row.email }}</h6>
                    <p class="card-text text-truncate mb-0">{{ row.balance }}</p>
                    <p class="card-text text-truncate text-right">{{ row.birthdate }}</p>
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
import jsonUsers from '@root/example-data/users.json'

const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj || {}))
}

const users1 = clone(jsonUsers).slice(0, 12)
const users2 = clone(jsonUsers).slice(13, 25)
const usersAll = clone(jsonUsers)

const user = {
  _id: 'EA265B20-45F2-953C-C534-3E2A78620ins',
  isActive: true,
  onlineStatus: 'Do not disturb',
  balance: 10000,
  birthdate: '1978-12-24',
  favoriteColor: 'orredange',
  firstName: 'Inserted',
  lastName: 'User',
  name: 'Inserted User',
  company: 'Inserted AG',
  email: 'inserted@inserted.co.uk',
  phone: '(0112) 192 5651',
  address: 'P.O. Box 98, 571 Inserted Rd.',
  favoriteAnimal: 'cat'
}

export default {
  name: 'Home',
  data() {
    return {
      users: [],
      statusClass: {
        Active: 'text-success',
        Away: 'text-warning',
        'Do not disturb': 'text-danger',
        Invisible: 'text-secondary'
      },
      selected: 5
    }
  },
  methods: {
    setData1() {
      this.users = users1
    },
    setData2() {
      this.users = users2
    },
    setDataAll() {
      this.users = usersAll
    },
    updateDsData(data) {
      console.log(data)
    },
    addOne() {
      this.users.unshift(user)
    },
    removeOne() {
      this.users.splice(0, 1)
    }
  }
}
</script>
