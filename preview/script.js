const products = [
    // 프리미엄실크 (Target: 6+)
    { category: "프리미엄실크", brand: "lx", name: "디아망", prefix: "LX", price_standard: 60000, price_bulk: 55000, unit: "롤" },
    { category: "프리미엄실크", brand: "lx", name: "디아망포티스", prefix: "LX", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "gaenari", name: "프리모", prefix: "개나리", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "kcc", name: "파사드", prefix: "KCC신한", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "kcc", name: "파사드월가드", prefix: "신한", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "lx", name: "디아망 (천장지)", prefix: "LX", price_standard: 60000, price_bulk: 53000, unit: "롤" },
    { category: "프리미엄실크", brand: "gaenari", name: "로하스", prefix: "개나리", price_standard: 58000, price_bulk: 50000, unit: "롤" },

    // 일반실크 (Target: 6+)
    { category: "일반실크", brand: "lx", name: "베스띠", prefix: "LX", price_standard: 60000, price_bulk: 55000, unit: "롤" },
    { category: "일반실크", brand: "lx", name: "지아패브릭", prefix: "LX", price_standard: 45000, price_bulk: 40000, unit: "롤" },
    { category: "일반실크", brand: "gaenari", name: "아트북", prefix: "개나리", price_standard: 42000, price_bulk: 38000, unit: "롤" },
    { category: "일반실크", brand: "gaenari", name: "에비뉴", prefix: "개나리", price_standard: 42000, price_bulk: 38000, unit: "롤" },
    { category: "일반실크", brand: "kcc", name: "스케치", prefix: "KCC신한", price_standard: 43000, price_bulk: 39000, unit: "롤" },
    { category: "일반실크", brand: "kcc", name: "심플", prefix: "KCC신한", price_standard: 43000, price_bulk: 39000, unit: "롤" },

    // 광폭합지 (Target: 6+)
    { category: "광폭합지", brand: "lx", name: "휘앙세", prefix: "LX", price_standard: 40000, price_bulk: 35000, unit: "롤" },
    { category: "광폭합지", brand: "lx", name: "휘앙세 와이드", prefix: "LX", price_standard: 42000, price_bulk: 37000, unit: "롤" },
    { category: "광폭합지", brand: "gaenari", name: "트렌디", prefix: "개나리", price_standard: 38000, price_bulk: 33000, unit: "롤" },
    { category: "광폭합지", brand: "gaenari", name: "스타일", prefix: "개나리", price_standard: 38000, price_bulk: 33000, unit: "롤" },
    { category: "광폭합지", brand: "kcc", name: "아이리스", prefix: "KCC신한", price_standard: 39000, price_bulk: 34000, unit: "롤" },
    { category: "광폭합지", brand: "kcc", name: "파인하임", prefix: "KCC신한", price_standard: 39000, price_bulk: 34000, unit: "롤" },

    // 소폭합지 (Target: 6+)
    { category: "소폭합지", brand: "lx", name: "소폭", prefix: "LX", price_standard: 30000, price_bulk: 25000, unit: "롤" },
    { category: "소폭합지", brand: "gaenari", name: "소폭", prefix: "개나리", price_standard: 28000, price_bulk: 23000, unit: "롤" },
    { category: "소폭합지", brand: "kcc", name: "소폭", prefix: "KCC신한", price_standard: 29000, price_bulk: 24000, unit: "롤" },
    { category: "소폭합지", brand: "lx", name: "소폭 플러스", prefix: "LX", price_standard: 32000, price_bulk: 27000, unit: "롤" },
    { category: "소폭합지", brand: "gaenari", name: "소폭 베이직", prefix: "개나리", price_standard: 28000, price_bulk: 23000, unit: "롤" },
    { category: "소폭합지", brand: "kcc", name: "소폭 라이트", prefix: "KCC신한", price_standard: 29000, price_bulk: 24000, unit: "롤" },
];

const categoryOrder = ["프리미엄실크", "일반실크", "광폭합지", "소폭합지"];

function formatPrice(price) {
    return price.toLocaleString() + '원';
}

function renderProducts(filterBrand = 'all') {
    const listContainer = document.getElementById('product-list');
    listContainer.innerHTML = '';

    // Filter products
    const filteredProducts = products.filter(p => filterBrand === 'all' || p.brand === filterBrand);

    // Group by category
    const grouped = filteredProducts.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
    }, {});

    // Render in order
    categoryOrder.forEach(category => {
        if (!grouped[category]) return;

        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        grouped[category].forEach(item => {
            const row = document.createElement('div');
            row.className = 'product-card';

            // Name Section
            const nameDiv = document.createElement('div');
            nameDiv.className = 'product-name-group';
            nameDiv.innerHTML = `
                <span class="brand-badge">${item.prefix}</span>
                <span class="product-name-text">${item.name}</span>
            `;

            // Standard Price
            const standardDiv = document.createElement('div');
            standardDiv.className = 'price-box price-standard';
            // Mobile label handling would be done in CSS via pseudo-elements or just simplified
            standardDiv.innerHTML = `
                <span class="amount">${formatPrice(item.price_standard)}</span> <span class="unit">/롤</span>
            `;

            // Bulk Price
            const bulkDiv = document.createElement('div');
            bulkDiv.className = 'price-box price-bulk';
            bulkDiv.innerHTML = `
                <span class="amount">${formatPrice(item.price_bulk)}</span> <span class="unit">/롤</span>
            `;

            row.appendChild(nameDiv);
            row.appendChild(standardDiv);
            row.appendChild(bulkDiv);
            categorySection.appendChild(row);
        });

        listContainer.appendChild(categorySection);
    });

    if (listContainer.innerHTML === '') {
        listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color:#888;">해당 브랜드의 상품이 없습니다.</div>';
    }
}

// Event Listeners for Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const brand = btn.getAttribute('data-brand');
        renderProducts(brand);
    });
});

// Initial Render
renderProducts();
