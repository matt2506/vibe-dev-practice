import "./globals.css";

export const metadata = {
    title: "벽지 단가표",
    description: "벽지 브랜드별 단가표 (LX, 개나리, KCC신한)",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
