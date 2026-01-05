import MaterialPriceList from "../components/MaterialPriceList";

export default function Home() {
    return (
        <main>
            <div className="container">
                <header>
                    <h1 className="page-title">자재 단가표</h1>
                </header>
                <MaterialPriceList />
            </div>
        </main>
    );
}
