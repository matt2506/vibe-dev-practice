'use client';

import { useState, useEffect } from 'react';
import WallpaperPriceList from './WallpaperPriceList';

export default function MaterialPriceList() {
    const [activeCategory, setActiveCategory] = useState('wallpaper');
    const [productsData, setProductsData] = useState({ wallpaper: [], floor: [], film: [], jangpan: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProductsData(data);
                }
            } catch (error) {
                console.error('Failed to fetch product data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderPriceList = (data, isWallpaper = false) => {
        if (!data || data.length === 0) return <div style={{ textAlign: 'center', padding: '50px' }}>데이터가 없습니다.</div>;

        const formatPrice = (price) => price.toLocaleString() + '원';

        // Group by category
        const grouped = data.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = [];
            acc[curr.category].push(curr);
            return acc;
        }, {});

        // Category Order for Wallpaper (specific sort order)
        const wallpaperOrder = ["프리미엄실크", "일반실크", "광폭합지", "소폭합지"];
        const orderedCategories = isWallpaper ? wallpaperOrder : Object.keys(grouped);

        return (
            <div className="product-list">
                {orderedCategories.map((category, index) => {
                    if (!grouped[category]) return null;

                    // Show header under the first category title
                    const showHeader = index === 0;

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
                                        <span className="amount">{formatPrice(item.price_standard)}</span> <span className="unit">/{item.unit}</span>
                                    </div>
                                    <div className="price-box price-bulk">
                                        {item.price_bulk && item.price_bulk > 0 ? (
                                            <>
                                                <span className="amount">{formatPrice(item.price_bulk)}</span> <span className="unit">/{item.unit}</span>
                                            </>
                                        ) : (
                                            <span style={{ fontSize: '0.9rem', color: '#95a5a6', fontWeight: 500 }}>미적용</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

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
            {activeCategory === 'wallpaper' ? (
                <WallpaperPriceList data={productsData.wallpaper} />
            ) : (
                renderPriceList(productsData[activeCategory])
            )}
        </div>
    );
}
