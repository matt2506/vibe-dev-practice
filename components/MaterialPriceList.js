'use client';

import { useState } from 'react';
import WallpaperPriceList from './WallpaperPriceList';

const dummyData = {
    floor: [
        { category: "강마루", brand: "lx", name: "강그린", prefix: "LX", price_standard: 45000, price_bulk: 40000, unit: "평" },
        { category: "강마루", brand: "kcc", name: "숲으로", prefix: "KCC", price_standard: 43000, price_bulk: 39000, unit: "평" },
        { category: "강화마루", brand: "dongwha", name: "클릭", prefix: "동화", price_standard: 35000, price_bulk: 30000, unit: "평" },
    ],
    film: [
        { category: "솔리드", brand: "lx", name: "베니프", prefix: "LX", price_standard: 15000, price_bulk: 12000, unit: "m" },
        { category: "우드", brand: "3m", name: "다이노크", prefix: "3M", price_standard: 25000, price_bulk: 20000, unit: "m" },
    ],
    jangpan: [
        { category: "1.8T", brand: "lx", name: "뉴청맥", prefix: "LX", price_standard: 35000, price_bulk: 30000, unit: "m" },
        { category: "2.2T", brand: "kcc", name: "숲", prefix: "KCC", price_standard: 45000, price_bulk: 40000, unit: "m" },
    ]
};

export default function MaterialPriceList() {
    const [activeCategory, setActiveCategory] = useState('wallpaper');

    const renderDummyList = (data) => {
        const formatPrice = (price) => price.toLocaleString() + '원';

        // Group by category for the dummy data
        const grouped = data.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = [];
            acc[curr.category].push(curr);
            return acc;
        }, {});

        return (
            <div className="product-list">
                {Object.keys(grouped).map(category => (
                    <div key={category} className="category-section">
                        <div className="category-title">{category}</div>
                        {grouped[category].map((item, idx) => (
                            <div key={idx} className="product-card">
                                <div className="product-name-group">
                                    <span className="brand-badge">{item.prefix}</span>
                                    <span className="product-name-text">{item.name}</span>
                                </div>
                                <div className="price-box price-standard">
                                    <span className="amount">{formatPrice(item.price_standard)}</span> <span className="unit">/{item.unit}</span>
                                </div>
                                <div className="price-box price-bulk">
                                    <span className="amount">{formatPrice(item.price_bulk)}</span> <span className="unit">/{item.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {/* Top Level Category Tabs */}
            <div className="tabs" style={{ marginBottom: '30px', flexWrap: 'wrap' }}>
                <button
                    className={`tab-btn ${activeCategory === 'wallpaper' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('wallpaper')}
                >
                    벽지
                </button>
                <button
                    className={`tab-btn ${activeCategory === 'floor' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('floor')}
                >
                    마루
                </button>
                <button
                    className={`tab-btn ${activeCategory === 'film' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('film')}
                >
                    필름
                </button>
                <button
                    className={`tab-btn ${activeCategory === 'jangpan' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('jangpan')}
                >
                    장판
                </button>
            </div>

            {/* Content Area */}
            {activeCategory === 'wallpaper' && <WallpaperPriceList />}
            {activeCategory === 'floor' && renderDummyList(dummyData.floor)}
            {activeCategory === 'film' && renderDummyList(dummyData.film)}
            {activeCategory === 'jangpan' && renderDummyList(dummyData.jangpan)}
        </div>
    );
}
