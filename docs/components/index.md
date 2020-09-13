## Dataset
The dataset component acts as the provider component of all the data and methods vue-dataset needs to function.
It does so by using the provide/inject mechanism of Vue so that data is also accessible in nested levels down the component tree.

Dataset takes the original data object as a prop and also some useful props as options that dictate how the data will be filtered, searched and sorted.

### Example
```vue
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-filter-fields="{firstName: 'John'}"
      :ds-sortby="['lastName']"
      :ds-search-in="['firstName', 'lastName']"
      :ds-search-as="{birthDate: searchAsEuroDate}"
    >
    ...
    </dataset>
```

### Props
#### ds-data
Type: `Array of Objects`  
Default: <em>Empty Array</em>

This is the data object that vue-dataset will operate on.  
It must be an Array of Objects. 
``` js
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
  return value.toLowerCase().startsWith('D');
}
```

#### ds-sortby
Type: `Array`  
Default: <em>Empty Array</em>

It defines the data object properties by which the dataset object will be sorted.
If a property is prefixed by `-` it will be sorted with descending order.

For example this will sort the data by lastName

```js
['lastName']
```

#### ds-search-as
Type: `Object`  
Default: <em>Empty Object</em>

It defines how certain properties of the data object will be searched.
The object key denotes the data object property and the object value is an instance function name `String` or `Function` that will be used to search
that data property. This is useful in situations when you are displaying a formatted value and you want the user to be able to search
it inside the data object with the same format as it appears on-screen.

For example this will set the birthDate attribute searchable by `searchAsEuroDate` method
and will allow birthdate dates defined as YYYY-MM-DD format to be searched as DD.MM.YYYY format.

```js
{birthDate: searchAsEuroDate}
```

Inside your instance methods
```js
searchAsEuroDate: function (value, searchString) {
  const parts = searchString.split('.');
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return isoDate === value;
};
```

### Provides

Dataset `provides` several data and methods to the child components.  
You can leverage these using `inject` to create your own child components.

#### The ds object
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
      <td>The data object that contains all the data.</td>
    </tr>
    <tr>
      <td>dsRows</td>
      <td>Array</td>
      <td>The indexes of the data rows currently displaying</td>
    </tr>
    <tr>
      <td>dsResultsNumber</td>
      <td>Number</td>
      <td>The number of rows currently displaying</td>
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
      <td>dsPages</td>
      <td>Array</td>
      <td>The array used to create pagination links</td>
    </tr>
    <tr>
      <td>dsPagecount</td>
      <td>Number</td>
      <td>The number of pagination pages</td>
    </tr>
    <tr>
      <td>dsPage</td>
      <td>Number</td>
      <td>The number of the current page in pagination</td>
    </tr>         
  </tbody>
</table>  

#### methods
<table class="table table-bordered">
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
      <td>The data object that contains all the data.</td>
    </tr>
    <tr>
      <td>dsRows</td>
      <td>Array</td>
      <td>The indexes of the data rows currently displaying</td>
    </tr>
    <tr>
      <td>dsResultsNumber</td>
      <td>Number</td>
      <td>The number of rows currently displaying</td>
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
      <td>dsPages</td>
      <td>Array</td>
      <td>The array used to create pagination links</td>
    </tr>
    <tr>
      <td>dsPagecount</td>
      <td>Number</td>
      <td>The number of pagination pages</td>
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

The dataset item component is responsible for displaying the item rows of the dataset.
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

### Scoped slot

DatasetItem also provides the row's data via a `row` object exposed from a a scoped slot.
It also provides the row's original index, useful e.g if you want to delete an item.

#### The scoped slot object
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
      <td>row</td>
      <td>Object</td>
      <td>The dataset row data.</td>
    </tr>
    <tr>
      <td>rowIndex</td>
      <td>Number</td>
      <td>The original index of the data row</td>
    </tr>
  </tbody>
</table>

### Named slot `noDataFound`

DatasetItem provides a named slot to customize the "no data found" message.  
There's no default content for the slot.
