import "./globals.css";
import Sidebar from "../components/layout/Sidebar";

export const metadata = {
  title: "ScrollChainOS Operator Console",
  description: "Sovereign Intelligence Interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10 overflow-y-auto bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505]">
          {children}
        </main>
      </body>
    </html>
  );
}
