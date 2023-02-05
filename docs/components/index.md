## Dataset

The `dataset` component acts as the provider component of all the data and methods `vue-dataset` needs to function.
It does so by using the provide/inject mechanism of Vue so that data is also accessible in nested levels down the component tree.

Dataset takes the original data object as a prop and also some useful props as options that dictate how the data will be filtered, searched and sorted.

### Example

```vue
<dataset
  v-slot="{ ds }"
  :ds-data="users"
  :ds-filter-fields="{ firstName: 'John' }"
  :ds-sortby="['lastName']"
  :ds-search-in="['firstName', 'lastName']"
  :ds-search-as="{ birthDate: searchAsEuroDate }"
  :ds-sort-as="{ birthDate: sortAsDate }"
>
    ...
    </dataset>
```

### Props

#### ds-data

Type: `Array of Objects`  
Default: <em>Empty Array</em>

This is the data object that `vue-dataset` will operate on.  
It must be an Array of Objects.

```js
[
  {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '2004-02-11'
  },
  {
    firstName: 'George',
    lastName: 'Adams',
    birthDate: '2003-07-28'
  },
  ...
]
```

#### ds-filter-fields

Type: `Object`  
Default: <em>Empty Object</em>

It defines how certain properties of the data object will be filtered.
The object key denotes the data object property and the object value is a `value` or a `function` that will be used to filter
that data property.

For example this will filter the data by
firstName "John" and all lastNames that start with the letter "D"

```js
{
  firstName: 'John',
  lastName: startsWithD
}
```

`startsWithD` can be a function defined in your instance methods

```js
startsWithD (value) {
  return value.toLowerCase().startsWith('D')
}
```

#### ds-sortby

Type: `Array`  
Default: <em>Empty Array</em>

It defines the data object properties by which the dataset object will be sorted.
If a property is prefixed by `-` it will be sorted with descending order.

For example this will sort the data by lastName

```js
;['lastName']
```

#### ds-search-in

Type: `Array`  
Default: <em>Empty Array</em>

It restricts the search to certain data object properties.
If the `ds-search-in` array is empty (default), then all object properties will be searched.

For example this will tell `Dataset` to perform search **only** in the `firstName` and `lastName` data object properties.

```js
;['firstName', 'lastName']
```

#### ds-search-as

Type: `Object`  
Default: <em>Empty Object</em>

It defines how certain properties of the data object will be searched.
The object key denotes the data object property and the object value is a predicate `Function` that will be used to search
that data property. The predicate function has access to the column value, the search string and the current row data.

This is useful in situations when you are displaying a formatted value and you want the user to be able to search
it inside the data object with the same format as it appears on-screen.

For example this will set the birthDate attribute searchable by `searchAsEuroDate` method
and will allow birthdate dates defined as YYYY-MM-DD format to be searched as DD.MM.YYYY format.

```js
{
  birthDate: searchAsEuroDate
}
```

Inside your instance methods

```js
searchAsEuroDate: function (value, searchString, rowData) {
  const parts = searchString.split('.')
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`
  return isoDate === value
}
```

#### ds-sort-as

Type: `Object`  
Default: <em>Empty Object</em>

It defines how certain properties of the data object will be sorted.
The object key denotes the data object property and the object value is a `Function` that will be used to convert
that data property so that it can be sorted correctly. This is useful in situations when you have values that can't be sorted natively
such as currency or dates.

For example this will apply the `sortAsDate` method to the birthDate attribute so that dates defined as YYYY-MM-DD format can be sorted
correctly.

```js
{
  birthDate: sortAsDate
}
```

Inside your instance methods

```js
sortAsDate: function (isoDate) {
  return new Date(isoDate)
}
```

### Provides

Dataset `provides` reactive data and methods to the child components.  
You can leverage these using `inject` to create your own **custom child components**.

##### Reactive data provided by `vue-dataset`

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>dsData</td>
      <td>Array of Objects</td>
      <td>The data object that contains all the data</td>
    </tr>  
    <tr>
      <td>dsIndexes</td>
      <td>Array</td>
      <td>The indexes of all the filtered data rows, regardless of paging</td>
    </tr>  
    <tr>
      <td>dsRows</td>
      <td>Array</td>
      <td>The indexes of the data rows in the current displayed page</td>
    </tr>
    <tr>
      <td>dsPages</td>
      <td>Array</td>
      <td>The array used to create pagination links</td>
    </tr>
    <tr>
      <td>dsResultsNumber</td>
      <td>Number</td>
      <td>The number of rows currently displaying</td>
    </tr>
    <tr>
      <td>dsPagecount</td>
      <td>Number</td>
      <td>The number of pagination pages</td>
    </tr>
    <tr>
      <td>dsFrom</td>
      <td>Number</td>
      <td>The item "from" of paginated items currently displaying</td>
    </tr>
    <tr>
      <td>dsTo</td>
      <td>Number</td>
      <td>The item "to" of paginated items currently displaying</td>
    </tr>
    <tr>
      <td>dsPage</td>
      <td>Number</td>
      <td>The number of the current page in pagination</td>
    </tr>
    <tr>
      <td>dsShowEntries</td>
      <td>Number</td>
      <td>The number of items to show in pagination</td>
    </tr>    
    <tr>
      <td>datasetI18n</td>
      <td>Object</td>
      <td>An object containing translation strings</td>
    </tr>
  </tbody>
</table>

Example:

```vue
<template>
  <div>{{ dsRows }} - {{ dsPages }}</div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup(props) {
    const dsRows = inject('dsRows')
    const dsPages = inject('dsPages')

    return {
      dsRows,
      dsPages
    }
  }
}
</script>
```

##### Methods

<table class="table table-bordered w-100 d-block d-md-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th>Input value/Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>search</td>
      <td>String</td>
      <td>The value to search</td>
    </tr>
    <tr>
      <td>showEntries</td>
      <td>Number</td>
      <td>The number of items to show on each page</td>
    </tr>
    <tr>
      <td>setActive</td>
      <td>Number</td>
      <td>The number of the page to set as active</td>
    </tr>
  </tbody>
</table>

### Events

<table class="table table-bordered w-100 d-block d-md-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Emits</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>update:dsData</td>
      <td>Array of Objects</td>
      <td>Emits the <strong>filtered</strong> <code>dsData</code> items, every time the internal computed results is changed.</td>
    </tr>
  </tbody>
</table>

### Scoped slot

Dataset also provides several data via a `ds` object exposed from a a scoped slot.

#### The scoped slot ds object

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>dsData</td>
      <td>Array of Objects</td>
      <td>The data object that contains all the data</td>
    </tr>
    <tr>
      <td>dsIndexes</td>
      <td>Array</td>
      <td>The indexes of all the filtered data rows, regardless of paging</td>
    </tr>
    <tr>
      <td>dsRows</td>
      <td>Array</td>
      <td>The indexes of the data rows in the current displayed page</td>
    </tr>
    <tr>
      <td>dsPages</td>
      <td>Array</td>
      <td>The array used to create pagination links</td>
    </tr>    
    <tr>
      <td>dsResultsNumber</td>
      <td>Number</td>
      <td>The number of rows currently displaying</td>
    </tr>
    <tr>
      <td>dsPagecount</td>
      <td>Number</td>
      <td>The number of pagination pages</td>
    </tr>
    <tr>
      <td>dsFrom</td>
      <td>Number</td>
      <td>The item "from" of paginated items currently displaying</td>
    </tr>
    <tr>
      <td>dsTo</td>
      <td>Number</td>
      <td>The item "to" of paginated items currently displaying</td>
    </tr>
    <tr>
      <td>dsPage</td>
      <td>Number</td>
      <td>The number of the current page in pagination</td>
    </tr>
    <tr>
      <td>dsShowEntries</td>
      <td>Number</td>
      <td>The number of items to show in pagination</td>
    </tr>    
  </tbody>
</table>

## DatasetItem

The `dataset-item` component is responsible for displaying the item rows of the dataset.
Since it's a dynamic component it can take the form of any tag like `div`, `li`, `tr` etc.

DatasetItem must be nested inside the Dataset component in order to work.
It exposes one scoped slot with the the row's data and index and also one slot for the customization
of the "no data found" message.

### Example

```vue
<dataset-item>
  <template v-slot="{ row, rowIndex }">
    <div>
      {{ rowIndex }} - {{ row.firstName }}
    </div>
  </template>
  <template v-slot:noDataFound>
    <p>No results found</p>
  </template>
</dataset-item>
```

### Props

#### tag

Type: `String`  
Default: <em>div</em>

The HTML tag to render.

### Scoped slot

DatasetItem also provides the row's data via a `row` object exposed from a a scoped slot.
It also provides the row's original index, useful e.g if you want to delete an item.

#### The scoped slot object

<table class="table table-bordered w-100 d-block d-md-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>row</td>
      <td>Object</td>
      <td>The dataset row data</td>
    </tr>
    <tr>
      <td>rowIndex</td>
      <td>Number</td>
      <td>The original index of the data row</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>The iteration index</td>
    </tr>    
  </tbody>
</table>

### Named slot `noDataFound`

DatasetItem provides a named slot to customize the "no data found" message.  
There's no default content for the slot.

## DatasetInfo

The `dataset-info` component displays information about the range of items being displayed
and the total number of items in the dataset.

### Example

```vue
<dataset-info class="my-custom-class" />
```

## DatasetPager

The `dataset-pager` component displays the pagination controls.

### Example

```vue
<dataset-pager />
```

## DatasetShow

The `dataset-show` component displays a select that is used to control how many items are visible simultaneously.
Props can be used to customize the default number of visible items as well as the list for the select control.

### Example

```vue
<dataset-show />
```

### Props

#### ds-show-entries

Type: `Number`  
Default: <em>10</em>

The selected number of items to show.

#### ds-show-entries-lovs

Type: `Array of Objects`  
Default: `[{ value: 5, text: 5 }, { value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]`

The list of options for the select element.

## DatasetSearch

The `dataset-search` component displays an input search form control used to search inside the dataset data.  
Props can be used to customize the placeholder text as well as the debounce wait time.

### Example

```vue
<dataset-search ds-search-placeholder="Search..." />
```

### Props

#### ds-search-placeholder

Type: `String`  
Default: <em>Empty String</em>

The placeholder text of the input control.

#### wait

Type: `Number`  
Default: <em>0</em>

The amount of time the debounce function waits after the last received input action before executing the search.
