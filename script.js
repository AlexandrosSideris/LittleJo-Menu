document.addEventListener('DOMContentLoaded', () => {
    loadMenu('EN'); // Load the menu in English by default
});

function loadMenu(language) {
    fetch('menu.csv')
        .then(response => response.text())
        .then(data => {
            const menu = parseCSV(data, language);
            displayMenu(menu, language);
        });
}

function parseCSV(data, language) {
    const lines = data.split('\n').slice(1);
    const menu = {};

    lines.forEach(line => {
        const [categoryEN, categoryGR, productEN, productGR, quantity, price, currency, lang] = line.split(',');

        if (lang.trim() === language) {
            const category = language === 'EN' ? categoryEN.trim() : categoryGR.trim();
            const productName = language === 'EN' ? productEN.trim() : productGR.trim();
            const productPrice = `${price.trim()} ${currency.trim()}`;
            
            if (!menu[category]) {
                menu[category] = [];
            }

            menu[category].push({ name: productName, quantity: quantity.trim(), price: productPrice });
        }
    });

    return menu;
}

function displayMenu(menu, language) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';

    for (const category in menu) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        menu[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productName = document.createElement('span');
            productName.textContent = `${product.name} (x${product.quantity})`;
            productDiv.appendChild(productName);

            const productPrice = document.createElement('span');
            productPrice.textContent = product.price;
            productDiv.appendChild(productPrice);

            categoryDiv.appendChild(productDiv);
        });

        menuContainer.appendChild(categoryDiv);
    }
}

function changeLanguage(language) {
    loadMenu(language);
}