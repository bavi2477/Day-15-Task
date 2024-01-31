const apiUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json'; 
const itemsPerPage = 10;

let currentPage = 1;
let data = [];

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        renderTable(currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(page) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

   
    const headerRow = document.createElement('tr');
    ['ID', 'Name', 'Email'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    pageData.forEach(item => {
        const tr = document.createElement('tr');
        ['id', 'name', 'email'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    renderPagination(page);
}

function renderPagination(currentPage) {
    const paginationContainer = document.getElementById('buttons');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.length / itemsPerPage);

   
    const firstButton = createPaginationButton('First', () => handlePageClick(1));
    paginationContainer.appendChild(firstButton);

  
    const previousButton = createPaginationButton('Previous', () => handlePageClick(currentPage - 1));
    paginationContainer.appendChild(previousButton);

 
    for (let i = 1; i <= totalPages; i++) {
        const button = createPaginationButton(i, () => handlePageClick(i), i === currentPage);
        paginationContainer.appendChild(button);
    }

 
    const nextButton = createPaginationButton('Next', () => handlePageClick(currentPage + 1));
    paginationContainer.appendChild(nextButton);


    const lastButton = createPaginationButton('Last', () => handlePageClick(totalPages));
    paginationContainer.appendChild(lastButton);
}

function createPaginationButton(label, clickHandler, isActive = false) {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add('pagination-button');
    if (isActive) {
        button.classList.add('active');
    }
    button.addEventListener('click', clickHandler);
    return button;
}

function handlePageClick(pageNumber) {
    if (pageNumber < 1 || pageNumber > Math.ceil(data.length / itemsPerPage)) {
        return;
    }
    currentPage = pageNumber;
    renderTable(currentPage);
}


fetchData();