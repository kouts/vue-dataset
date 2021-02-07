---
pageClass: dataset-page
---

# vue-dataset

A set of Vue.js components to display datasets (lists) with filtering, paging, and sorting capabilities!  
Created with reusability in mind, so that one doesn't have to recreate the same functionality for lists over and over again.

> vue-dataset does not impose any structure or layout limitations on your HTML, you can use divs, tables or anything you like to present your data.

## Features

- Highly customizable DOM structure
- Custom filtering based on the row values from all or specific data keys
- "Search as" feature allows for searching using a custom search method
- Multi "column" searching, search data keys are configurable
- "Sort as" feature allows for sorting using a custom sorting method
- Multi "column" sorting, sortable data keys are configurable
- Pagination
- Pagination Information
- Global search with debounce setting
- Easy to extend with custom components


`vue-dataset` contains 6 components
- `dataset` &rarr; The wrapper/data provider component
- `dataset-item` &rarr; The item row component
- `dataset-info` &rarr; Displays paging information
- `dataset-pager` &rarr; Renders the paging buttons
- `dataset-search` &rarr; Renders the search input field
- `dataset-show` &rarr; Renders number of visible results select 

<h2 class="mb-4">Example using cards</h2>

<vue-example file="Example1" />