let paginationSelect = document.querySelector(
  '[data-component="pagination:select"]'
);
let paginationPrev = document.querySelector(
  '[data-component="pagination:previous"]'
);
let paginationNext = document.querySelector(
  '[data-component="pagination:next"]'
);

let buildPagination = function (pagination) {
  let newContent = '';
  for (let i = 1; i <= pagination.items.count; i++) {
    newContent = newContent + `<option>${i}</option>`;
  }
  paginationSelect.innerHTML = newContent;
};
let renderList = function (data) {
  // use the information from data to render the list view
  // so we need to select the list view in order to add more children
  let listView = document.querySelector('[data-component="list"]');
  let allNewItemsContent = '';
  // use the result.data we just load above to create the UI for listView
  // result.data is an array so we need to loop through the array
  for (let i = 0; i < data.length - 1; i++) {
    let item = data[i];
    let newItemContent = `
       <div class="col-6 col-md-3 mb-5 text-center" title="${item.title_english}">
         <a href="details.html?id=${item.mal_id}" class="link-primary d-block position-relative text-decoration-none" data-component="item">
           <span class="position-absolute badge bg-danger top-0 end-0">
               <i class="bi bi-star-fill"></i> ${item.score}
           </span>
           <span class="d-flex flex-column justify-content-center">
               <img class="rounded shadow" src="${item.images.jpg.large_image_url}" data-component="image" />
               <span class="text-dark mt-2" data-component="title">${item.title_english}</span>
           </span>
         </a>
       </div>`;

    allNewItemsContent = allNewItemsContent + newItemContent;
  }

  listView.innerHTML = allNewItemsContent;
};
let loadListWithPageNumber = function (pageNumber) {
  fetch(`https://api.jikan.moe/v4/top/anime?page=${pageNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log('new pages', result);
      // We need to render the same list UI here

      let data = result.data;
      renderList(data);
    });
};

fetch('https://api.jikan.moe/v4/top/anime')
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result);
    // figure out the kind of data we will use to render the list later
    // in this case it's result.data
    const data = result.data;
    const pagination = result.pagination;

    buildPagination(pagination);

    renderList(data);
  });

paginationSelect.addEventListener('change', function () {
  let selectedPage = paginationSelect.value;
  console.log(selectedPage);

  loadListWithPageNumber(selectedPage);
});

// When next button is clicked,
paginationNext.addEventListener('click', function () {
  // current option value
  let currentPaginationValue = paginationSelect.value;
  // change currentPaginationValue to a number

  currentPaginationValue = Number(currentPaginationValue);

  // will change to +1
  let newPaginationValue = currentPaginationValue + 1;
  let alloptions = selectPage.querySelector('option');
  let lastOption = allOptions[alloptions.length - 1];
  let lastOptionValue = lastOption.value;
  lastOptionValue = Number(lastOptionValue);
  // we need to set the value of the select to the new value
  paginationSelect.value = newPaginationValue;

  // load the list again using the new option value (after +1)
  loadListWithPageNumber(newPaginationValue);
});
previousPage.addEventListener('click', function () {
  let currentPaginationValue = selectPage.value;
  currentPageValue = Number(currentPageValue);
  let newPageValue = currentPageValue - 1;
  if (newPageValue >= 1) {
    selectPage.value = newPageValue;
    loadListWithPageNumber(newPageValue);
  }
});
