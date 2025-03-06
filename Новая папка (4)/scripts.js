let currentLanguage = 'en';
let catalogData;

async function fetchCatalogData() {
    const response = await fetch('data.json');
    catalogData = await response.json();
    renderCatalog();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    renderCatalog();
}

function renderCatalog() {
    const catalogTitle = document.getElementById('catalog-title');
    const catalogDiv = document.getElementById('catalog');
    catalogDiv.innerHTML = '';

    catalogTitle.textContent = catalogData[currentLanguage].categories.clothing.name;
    
    const categories = catalogData[currentLanguage].categories;

    for (let category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h2>${categories[category].name}</h2>`;

        categories[category].products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
            `;
            categoryDiv.appendChild(productDiv);
        });

        catalogDiv.appendChild(categoryDiv);
    }
}

fetchCatalogData();