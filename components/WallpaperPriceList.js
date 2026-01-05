'use client';

import { useState } from 'react';

const products = [
    // 프리미엄실크
    { category: "프리미엄실크", brand: "lx", name: "디아망", prefix: "LX", price_standard: 60000, price_bulk: 55000, unit: "롤" },
    { category: "프리미엄실크", brand: "lx", name: "디아망포티스", prefix: "LX", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "gaenari", name: "프리모", prefix: "개나리", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "kcc", name: "파사드", prefix: "KCC신한", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "kcc", name: "파사드월가드", prefix: "신한", price_standard: 70000, price_bulk: 15000, unit: "롤" },
    { category: "프리미엄실크", brand: "lx", name: "디아망 (천장지)", prefix: "LX", price_standard: 60000, price_bulk: 53000, unit: "롤" },
    { category: "프리미엄실크", brand: "gaenari", name: "로하스", prefix: "개나리", price_standard: 58000, price_bulk: 50000, unit: "롤" },

    // 일반실크
    { category: "일반실크", brand: "lx", name: "베스띠", prefix: "LX", price_standard: 60000, price_bulk: 55000, unit: "롤" },
    { category: "일반실크", brand: "lx", name: "지아패브릭", prefix: "LX", price_standard: 45000, price_bulk: 40000, unit: "롤" },
    { category: "일반실크", brand: "gaenari", name: "아트북", prefix: "개나리", price_standard: 42000, price_bulk: 38000, unit: "롤" },
    { category: "일반실크", brand: "gaenari", name: "에비뉴", prefix: "개나리", price_standard: 42000, price_bulk: 38000, unit: "롤" },
    { category: "일반실크", brand: "kcc", name: "스케치", prefix: "KCC신한", price_standard: 43000, price_bulk: 39000, unit: "롤" },
    { category: "일반실크", brand: "kcc", name: "심플", prefix: "KCC신한", price_standard: 43000, price_bulk: 39000, unit: "롤" },

    // 광폭합지
    { category: "광폭합지", brand: "lx", name: "휘앙세", prefix: "LX", price_standard: 40000, price_bulk: 35000, unit: "롤" },
    { category: "광폭합지", brand: "lx", name: "휘앙세 와이드", prefix: "LX", price_standard: 42000, price_bulk: 37000, unit: "롤" },
    { category: "광폭합지", brand: "gaenari", name: "트렌디", prefix: "개나리", price_standard: 38000, price_bulk: 33000, unit: "롤" },
    { category: "광폭합지", brand: "gaenari", name: "스타일", prefix: "개나리", price_standard: 38000, price_bulk: 33000, unit: "롤" },
    { category: "광폭합지", brand: "kcc", name: "아이리스", prefix: "KCC신한", price_standard: 39000, price_bulk: 34000, unit: "롤" },
    { category: "광폭합지", brand: "kcc", name: "파인하임", prefix: "KCC신한", price_standard: 39000, price_bulk: 34000, unit: "롤" },

    // 소폭합지
    { category: "소폭합지", brand: "lx", name: "소폭", prefix: "LX", price_standard: 30000, price_bulk: 25000, unit: "롤" },
    { category: "소폭합지", brand: "gaenari", name: "소폭", prefix: "개나리", price_standard: 28000, price_bulk: 23000, unit: "롤" },
    { category: "소폭합지", brand: "kcc", name: "소폭", prefix: "KCC신한", price_standard: 29000, price_bulk: 24000, unit: "롤" },
    { category: "소폭합지", brand: "lx", name: "소폭 플러스", prefix: "LX", price_standard: 32000, price_bulk: 27000, unit: "롤" },
    { category: "소폭합지", brand: "gaenari", name: "소폭 베이직", prefix: "개나리", price_standard: 28000, price_bulk: 23000, unit: "롤" },
    { category: "소폭합지", brand: "kcc", name: "소폭 라이트", prefix: "KCC신한", price_standard: 29000, price_bulk: 24000, unit: "롤" },
];

const categoryOrder = ["프리미엄실크", "일반실크", "광폭합지", "소폭합지"];

export default function WallpaperPriceList() {
    const [activeBrand, setActiveBrand] = useState('all');

    const formatPrice = (price) => {
        return price.toLocaleString() + '원';
    };

    const filteredProducts = products.filter(p => activeBrand === 'all' || p.brand === activeBrand);

    const grouped = filteredProducts.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
    }, {});

    return (
        <div>
            <div className="filter-chips">
                <button
                    className={`filter-chip ${activeBrand === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveBrand('all')}
                >
                    전체
                </button>
                <button
                    className={`filter-chip ${activeBrand === 'lx' ? 'active' : ''}`}
                    onClick={() => setActiveBrand('lx')}
                >
                    LX하우시스
                </button>
                <button
                    className={`filter-chip ${activeBrand === 'gaenari' ? 'active' : ''}`}
                    onClick={() => setActiveBrand('gaenari')}
                >
                    개나리
                </button>
                <button
                    className={`filter-chip ${activeBrand === 'kcc' ? 'active' : ''}`}
                    onClick={() => setActiveBrand('kcc')}
                >
                    KCC신한
                </button>
            </div>

            <div className="product-list">
                {(() => {
                    let headerRendered = false;
                    return categoryOrder.map(category => {
                        if (!grouped[category]) return null;

                        const showHeader = !headerRendered;
                        if (showHeader) headerRendered = true;

                        return (
                            <div key={category} className="category-section">
                                <div className="category-title">{category}</div>
                                {showHeader && (
                                    <div className="list-header" style={{ position: 'static', marginBottom: '15px' }}>
                                        <div className="list-header-item">제품정보</div>
                                        <div className="list-header-item">일반단가</div>
                                        <div className="list-header-item bulk-col">
                                            <span className="badge-bulk">✨ 벌크할인</span>
                                            <span>30만원이상 구매</span>
                                        </div>
                                    </div>
                                )}
                                {grouped[category].map((item, idx) => (
                                    <div key={idx} className="product-card">
                                        <div className="product-name-group">
                                            <span className="brand-badge">{item.prefix}</span>
                                            <span className="product-name-text">{item.name}</span>
                                        </div>
                                        <div className="price-box price-standard">
                                            <span className="amount">{formatPrice(item.price_standard)}</span> <span className="unit">/롤</span>
                                        </div>
                                        <div className="price-box price-bulk">
                                            <span className="amount">{formatPrice(item.price_bulk)}</span> <span className="unit">/롤</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    });
                })()}
                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        해당 브랜드의 상품이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
