## Dataset

The dataset component acts as the provider component of all the data and methods vue-dataset needs to function.
It does so by using the provide/inject mechanism of Vue so that data is also accessible in nested levels down the component tree.

Dataset takes the original data object as a prop and also some useful props as options that dictate how the data will be filtered, searched and sorted.

### Example
```vue
    <dataset
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

It defines the data object properties by which the dataset object will be sorted.
If a property is prefixed by `-` it will be sorted with descending order.

For example this will sort the data by lastName

```js
['lastName']
```

#### ds-search-as
Type: `Object`

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

