<template>
  <div>
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-sortby="sortBy"
      :ds-sort-as="{ birthdate: isoDateToDate }"
      :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteAnimal']"
      :ds-search-as="{ birthdate: searchAsEuroDate }"
    >
      <div class="row" :data-page-count="ds.dsPagecount">
        <div class="col-md-6 mb-2 mb-md-0">
          <dataset-show />
        </div>
        <div class="col-md-6">
          <dataset-search ds-search-placeholder="Search..." />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped d-md-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th v-for="(th, index) in cols" :key="th.field" :class="['sort', th.sort]" @click="click($event, index)">
                    {{ th.name }} <i class="gg-select float-right"></i>
                  </th>
                </tr>
              </thead>
              <dataset-item tag="tbody">
                <template #default="{ row, rowIndex }">
                  <tr>
                    <th scope="row">{{ rowIndex + 1 }}</th>
                    <td>{{ row.name }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ isoDateToEuroDate(row.birthdate) }}</td>
                  </tr>
                </template>
              </dataset-item>
            </table>
          </div>
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
import { isoDateToDate, isoDateToEuroDate, searchAsEuroDate } from '../utilities'

export default {
  name: 'Example2',
  data: function () {
    return {
      users,
      cols: [
        {
          name: 'Name',
          field: 'name',
          sort: ''
        },
        {
          name: 'Email',
          field: 'email',
          sort: ''
        },
        {
          name: 'Birthdate',
          field: 'birthdate',
          sort: ''
        }
      ]
    }
  },
  computed: {
    sortBy() {
      return this.cols.reduce((acc, o) => {
        if (o.sort) {
          o.sort === 'asc' ? acc.push(o.field) : acc.push('-' + o.field)
        }

        return acc
      }, [])
    }
  },
  methods: {
    click(event, i) {
      let toset
      const sortEl = this.cols[i]

      if (!event.shiftKey) {
        this.cols.forEach((o) => {
          if (o.field !== sortEl.field) {
            o.sort = ''
          }
        })
      }
      if (!sortEl.sort) {
        toset = 'asc'
      }
      if (sortEl.sort === 'desc') {
        toset = event.shiftKey ? '' : 'asc'
      }
      if (sortEl.sort === 'asc') {
        toset = 'desc'
      }
      sortEl.sort = toset
    },
    isoDateToEuroDate,
    isoDateToDate,
    searchAsEuroDate
  }
}
</script>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}

.gg-select::after,
.gg-select::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}

.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}

.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}

th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>
