'use client';

import { useState } from 'react';

export default function WallpaperPriceList({ data = [] }) {
    const [activeBrand, setActiveBrand] = useState('all');

    const formatPrice = (price) => {
        return price.toLocaleString() + '원';
    };

    // Use passed data instead of internal constant
    const filteredProducts = data.filter(p => activeBrand === 'all' || p.brand === activeBrand);

    const grouped = filteredProducts.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
    }, {});

    const categoryOrder = ["프리미엄실크", "일반실크", "광폭합지", "소폭합지"];

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
                                        <div className="list-header-item">제품라인</div>
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
                                            {item.price_bulk && item.price_bulk > 0 ? (
                                                <>
                                                    <span className="amount">{formatPrice(item.price_bulk)}</span> <span className="unit">/롤</span>
                                                </>
                                            ) : (
                                                <span style={{ fontSize: '0.9rem', color: '#95a5a6', fontWeight: 500 }}>미적용</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    });
                })()}
                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        표시할 상품이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
