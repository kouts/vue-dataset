---
pageClass: dataset-page
---

# vue-dataset

A set of Vue.js components to display datasets and lists with filtering, paging and sorting capabilities!  
It is created in order to solve the problem of recreating the same functionality for lists again and again.

> vue-dataset does not impose any layout limitations, you can use divs, tables or anything you like to present your data.

It is most suitable in scenarios, where the amount of data is small (e.g 1000 rows), so that all data can be loaded at once from the server into the UI.

`vue-dataset` contains 6 components
- `dataset` &rarr; wrapper/data provider component
- `dataset-item` &rarr; item row component
- `dataset-info` &rarr; Displays paging information
- `dataset-pager` &rarr; Renders the paging buttons
- `dataset-search` &rarr; Renders the search input field
- `dataset-show` &rarr; Renders number of visible results select 

<!-- `dataset` is the wrapper component that acts as the provider of the data and methods to the child components.
It also accepts a number of options that have to do with how the data is filtered, searched and sorted.

`dataset-item` is the component that is responsible for displaying the data row.
It uses slots so you are free to use a table row `tr` a `div` an `li` or anything you like. -->

<h2 class="mb-4">Example using cards</h2>

<Example1 />