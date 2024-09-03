document.addEventListener('DOMContentLoaded', () => {
    loadMenu('GR'); // Load the menu in Greek by default
});

function loadMenu(language) {
    fetch('menu.csv')
        .then(response => response.text())
        .then(data => {
            const menu = parseCSV(data, language);
            displayMenu(menu);
        });
}

function parseCSV(data, language) {
    const lines = data.split('\n').slice(1); // Remove header
    const menu = {};

    lines.forEach(line => {
        const [category, productName, productDescription, quantity, price, currency, lang] = line.split(';');

        if (lang.trim() === language) {
            const productPrice = `${price.trim()} ${currency.trim()}`;
            
            if (!menu[category]) {
                menu[category] = [];
            }

            menu[category].push({ 
                name: productName, 
                description: productDescription, 
                quantity: quantity.trim(), 
                price: productPrice 
            });
        }
    });

    return menu;
}

function displayMenu(menu) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';

    // for (const category in menu) {
    //     const categoryDiv = document.createElement('div');
    //     categoryDiv.classList.add('category');

    //     const categoryTitle = document.createElement('h2');
    //     categoryTitle.textContent = category;
    //     categoryDiv.appendChild(categoryTitle);

    //     menu[category].forEach(product => {
    //         const productDiv = document.createElement('div');
    //         productDiv.classList.add('product');

    //         const productName = document.createElement('span');
    //         productName.textContent = `${product.name} (${product.quantity})`;
    //         productDiv.appendChild(productName);

    //         const productDescription = document.createElement('p');
    //         productDescription.textContent = product.description;
    //         productDescription.classList.add('description');
    //         productDiv.appendChild(productDescription);

    //         const productPrice = document.createElement('span');
    //         productPrice.textContent = product.price;
    //         productDiv.appendChild(productPrice);

    //         categoryDiv.appendChild(productDiv);
    //     });

    for (const category in menu) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        menu[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productHeader = document.createElement('div');
            productHeader.classList.add('product-header');

            const productName = document.createElement('span');
            productName.textContent = `${product.name} (${product.quantity})`;
            productName.classList.add('product-name');
            productHeader.appendChild(productName);

            const productPrice = document.createElement('span');
            productPrice.textContent = product.price;
            productPrice.classList.add('price');
            productHeader.appendChild(productPrice);

            productDiv.appendChild(productHeader);

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productDescription.classList.add('description');
            productDiv.appendChild(productDescription);

            categoryDiv.appendChild(productDiv);
        });

        menuContainer.appendChild(categoryDiv);
    }
}

function changeLanguage(language) {
    loadMenu(language);
}