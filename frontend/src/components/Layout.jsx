import Navbar from "./Navbar"
const Layout = ({children}) => {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main className="mx-auto<D-Space w-full max-w-5xl px-4 py-8">
            {children} </main>
      <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-500">Job application tracker by AnkurAlpha</div>
      </footer>
      </div>
  )
}

export default Layout
