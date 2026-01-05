import WallpaperPriceList from "../components/WallpaperPriceList";

export default function Home() {
    return (
        <main>
            <div className="container">
                <header>
                    <h1 className="page-title">벽지 단가표</h1>
                </header>
                <WallpaperPriceList />
            </div>
        </main>
    );
}
