import MaterialPriceList from "../components/MaterialPriceList";

export default function Home() {
    return (
        <main>
            <div className="container">
                <header>
                    <h1 className="page-title">자재 단가표</h1>
                    <a href="/admin" className="admin-link">
                        ⚙️ 단가표 설정하기
                    </a>
                </header>
                <MaterialPriceList />
            </div>
        </main>
    );
}
