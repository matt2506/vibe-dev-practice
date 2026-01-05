'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const CATEGORIES = {
    wallpaper: ["프리미엄실크", "일반실크", "광폭합지", "소폭합지"],
    floor: ["강마루", "강화마루", "원목마루"],
    film: ["솔리드", "우드", "메탈", "패브릭"],
    jangpan: ["1.8T", "2.0T", "2.2T", "3.0T", "4.5T"]
};

const BRANDS = {
    wallpaper: [
        { id: "lx", name: "LX하우시스", prefix: "LX" },
        { id: "gaenari", name: "개나리", prefix: "개나리" },
        { id: "kcc", name: "KCC신한", prefix: "KCC신한" },
        { id: "shinhan", name: "신한", prefix: "신한" },
        { id: "cosmos", name: "코스모스", prefix: "코스모스" },
    ],
    floor: [
        { id: "lx", name: "LX", prefix: "LX" },
        { id: "kcc", name: "KCC", prefix: "KCC" },
        { id: "dongwha", name: "동화", prefix: "동화" },
        { id: "hansol", name: "한솔", prefix: "한솔" },
    ],
    film: [
        { id: "lx", name: "LX", prefix: "LX" },
        { id: "3m", name: "3M", prefix: "3M" },
        { id: "hyundai", name: "현대", prefix: "현대" },
    ],
    jangpan: [
        { id: "lx", name: "LX", prefix: "LX" },
        { id: "kcc", name: "KCC", prefix: "KCC" },
        { id: "jinayang", name: "진양", prefix: "진양" },
    ]
};

const UNITS = ["롤", "평", "m", "box", "ea"];

export default function AdminPage() {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('wallpaper');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (err) {
            alert('데이터 로드 실패');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert('저장되었습니다.');
            } else {
                alert('저장 실패');
            }
        } catch (err) {
            alert('저장 중 오류 발생');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (index, field, value) => {
        const newData = { ...data };
        newData[activeTab][index][field] = value;
        setData(newData);
    };

    const handleBrandChange = (index, brandId) => {
        const brand = BRANDS[activeTab]?.find(b => b.id === brandId) || { id: brandId, prefix: brandId };
        const newData = { ...data };
        newData[activeTab][index].brand = brandId;
        newData[activeTab][index].prefix = brand.prefix;
        setData(newData);
    };

    const handleDelete = (index) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const newData = { ...data };
        newData[activeTab].splice(index, 1);
        setData(newData);
    };

    const handleAdd = () => {
        const newData = { ...data };
        const defaultCategory = CATEGORIES[activeTab]?.[0] || "";
        const defaultBrand = BRANDS[activeTab]?.[0] || { id: "", prefix: "" };

        const emptyItem = {
            category: defaultCategory,
            brand: defaultBrand.id,
            name: "새 제품",
            prefix: defaultBrand.prefix,
            price_standard: 0,
            price_bulk: 0,
            unit: "롤"
        };
        newData[activeTab].push(emptyItem);
        setData(newData);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(data[activeTab]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const newData = { ...data };
        newData[activeTab] = items;
        setData(newData);
    };

    if (!mounted) return null;
    if (loading) return <div className="p-10 text-center">로딩 중...</div>;
    if (!data) return null;

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <a href="/" style={{ textDecoration: 'none', fontSize: '1.5rem' }}>⬅️</a>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>자재 단가 관리자</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {saving ? '저장 중...' : '변경사항 저장'}
                </button>
            </header>

            <div className="filter-chips" style={{ marginBottom: '20px' }}>
                {Object.keys(data).map(key => (
                    <button
                        key={key}
                        className={`filter-chip ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                        style={{ marginRight: '10px' }}
                    >
                        {key === 'wallpaper' ? '벽지' : key === 'floor' ? '마루' : key === 'film' ? '필름' : '장판'}
                    </button>
                ))}
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                <th style={{ width: '50px' }}></th>
                                <th style={{ padding: '10px' }}>카테고리</th>
                                <th style={{ padding: '10px' }}>브랜드</th>
                                <th style={{ padding: '10px' }}>제품명</th>
                                <th style={{ padding: '10px' }}>일반단가</th>
                                <th style={{ padding: '10px' }}>벌크단가 (0=미적용)</th>
                                <th style={{ padding: '10px' }}>단위</th>
                                <th style={{ padding: '10px' }}>관리</th>
                            </tr>
                        </thead>
                        <Droppable droppableId="products-list">
                            {(provided) => (
                                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                    {data[activeTab].map((item, index) => (
                                        <Draggable key={`${item.name}-${index}`} draggableId={`${item.name}-${index}`} index={index}>
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        borderBottom: '1px solid #f5f5f5',
                                                        background: 'white',
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <td {...provided.dragHandleProps} style={{ textAlign: 'center', cursor: 'grab', color: '#bdc3c7' }}>
                                                        ☰
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <select
                                                            value={item.category}
                                                            onChange={(e) => handleChange(index, 'category', e.target.value)}
                                                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        >
                                                            {CATEGORIES[activeTab]?.map(cat => (
                                                                <option key={cat} value={cat}>{cat}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <select
                                                            value={item.brand}
                                                            onChange={(e) => handleBrandChange(index, e.target.value)}
                                                            style={{ width: '120px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        >
                                                            {BRANDS[activeTab]?.map(brand => (
                                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="number"
                                                            value={item.price_standard}
                                                            onChange={(e) => handleChange(index, 'price_standard', Number(e.target.value))}
                                                            style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="number"
                                                            value={item.price_bulk}
                                                            onChange={(e) => handleChange(index, 'price_bulk', Number(e.target.value))}
                                                            style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <select
                                                            value={item.unit}
                                                            onChange={(e) => handleChange(index, 'unit', e.target.value)}
                                                            style={{ width: '70px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                        >
                                                            {UNITS.map(unit => (
                                                                <option key={unit} value={unit}>{unit}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer' }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </table>
                </DragDropContext>
                <button
                    onClick={handleAdd}
                    style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '10px',
                        border: '2px dashed #ddd',
                        color: '#999',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    + 제품 추가하기
                </button>
            </div>
        </div>
    );
}
