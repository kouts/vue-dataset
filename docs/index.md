---
pageClass: dataset-page
---

# vue-dataset

A set of Vue.js components to display datasets and lists with filtering, paging and sorting capabilities!  
It is created in order to solve the problem of recreating the same functionality for lists over and over again.

> vue-dataset does not impose any structure or layout limitations, you can use divs, tables or anything you like to present your data.

## Features

- Custom filtering based on the row values from all or specific data keys
- "Search as" feature allows for searching using formatted values instead of raw data values
- Global search with debounce setting
- Multi "column" sorting, sortable data keys are configurable
- Pagination
- Pagination Information
- Highly customizable DOM structure
- Easy to extend with custom components


`vue-dataset` contains 6 components
- `dataset` &rarr; The wrapper/data provider component
- `dataset-item` &rarr; The item row component
- `dataset-info` &rarr; Displays paging information
- `dataset-pager` &rarr; Renders the paging buttons
- `dataset-search` &rarr; Renders the search input field
- `dataset-show` &rarr; Renders number of visible results select 

<h2 class="mb-4">Example using cards</h2>

<source-view />

<example1 />