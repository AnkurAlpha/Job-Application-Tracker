import Navbar from "./Navbar";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  return (
    <div className="app-shell min-h-screen text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="fade-up">{children}</div>
      </main>
      <footer className="mt-8 border-t border-slate-200/70 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8">
          <span>Job Application Tracker</span>
          <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Built by AnkurAlpha</span>
        </div>
      </footer>
      <Toaster richColors position="top-right" offset={20} closeButton theme="light" />
    </div>
  );
};

export default Layout;
