const products = [
    { id: 1, name: "Перфоратор Bosch GBH", category: "build", price: 900, icon: "🔨", available: true },
    { id: 2, name: "Бетономешалка 180л", category: "build", price: 1200, icon: "🏗️", available: true },
    { id: 3, name: "Виброплита 90кг", category: "build", price: 1500, icon: "🚜", available: false },
    { id: 4, name: "Газонокосилка Huter", category: "garden", price: 800, icon: "🌿", available: true },
    { id: 5, name: "Триммер бензиновый", category: "garden", price: 600, icon: "🌱", available: true },
    { id: 6, name: "Проектор Epson XGA", category: "event", price: 1500, icon: "📽️", available: true },
    { id: 7, name: "Акустика JBL 1000W", category: "event", price: 3000, icon: "🔊", available: true },
    { id: 8, name: "Светодиодный экран", category: "event", price: 5000, icon: "📺", available: true },
];

const catalogGrid = document.getElementById('catalog-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceDisplay = document.getElementById('price-display');
const modal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-btn');
const bookingForm = document.getElementById('booking-form');
const modalItemName = document.getElementById('modal-item-name');
function renderProducts(items) {
    catalogGrid.innerHTML = '';
    
    if (items.length === 0) {
        catalogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 18px; color: #666;">По вашему запросу ничего не найдено.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img">${item.icon}</div>
            <div class="card-body">
                <div class="card-cat">${getCategoryName(item.category)}</div>
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price">${item.price} ₽ / сутки</div>
                <button class="card-btn" 
                    onclick="openModal('${item.name}')" 
                    ${!item.available ? 'disabled' : ''}>
                    ${item.available ? 'Забронировать' : 'Нет в наличии'}
                </button>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const names = { 'build': 'Строительное', 'garden': 'Садовое', 'event': 'Мероприятия' };
    return names[cat] || cat;
}

function filterProducts() {
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);

    const filtered = products.filter(item => {
        const matchCat = category === 'all' || item.category === category;
        const matchPrice = item.price <= maxPrice;
        return matchCat && matchPrice;
    });

    renderProducts(filtered);
}

categoryFilter.addEventListener('change', filterProducts);

priceFilter.addEventListener('input', (e) => {
    priceDisplay.textContent = e.target.value;
    filterProducts();
});

window.openModal = function(itemName) {
    modalItemName.textContent = `Вы бронируете: ${itemName}`;
    modal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка принята. Менеджер свяжется с вами в течение 15 минут.');
    modal.classList.remove('active');
    bookingForm.reset();
});

renderProducts(products);