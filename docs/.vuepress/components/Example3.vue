<template>
  <div>
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-search-in="['balance', 'birthdate', 'name', 'company', 'email', 'phone', 'address', 'favoriteAnimal']"
      :ds-search-as="{birthdate: searchAsEuroDate}"
    >
      <div class="row">
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <dataset-item tag="tbody">
                <template v-slot="{ row, rowIndex }">
                  <tr>
                    <th scope="row">{{ rowIndex + 1 }}</th>
                    <td>{{ row.name }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.phone }}</td>
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
// https://next.json-generator.com/4JvxrAE2O
import users from '../../../example-data/users.json';

export default {
  name: 'Example2',
  data: function () {
    return {
      users: users
    };
  }
};
</script>
