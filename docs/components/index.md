## Dataset

The dataset component acts as the provider component of all the data and methods vue-dataset needs to function.
It does so by using the provide/inject mechanism of Vue so that data is also accessible in nested levels down the component tree.

Dataset takes the input data as a prop and also some useful prop options that dictate how the data will be filtered, searched and sorted.

### Props
#### ds-data
Type: `Array of Objects`

This is the data object that vue-dataset will operate on.  
It must be an Array of Objects. 
``` js
[
  {
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    firstName: 'George',
    lastName: 'Adams'
  },
  ... 
]
```

#### ds-filter-fields
Type: `Object`

It defines how certain properties of the data object will be filtered.
The object key denotes the data object property and the object value is a `value` or a `function` that will be used to filter
that data property.  

For example this will filter the data by ```firstName = 'John'``` 

```js
{
  firstName: 'John'
}
```