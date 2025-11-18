import { useState } from 'react'
import Hero from './components/Hero'
import OfferList from './components/OfferList'
import VendorForm from './components/VendorForm'

function App() {
  const [filters, setFilters] = useState({ city: 'Tirana', q: '' })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),transparent_50%)]"></div>

      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold">MM</div>
          <div className="text-white font-semibold">MbaroMirë</div>
        </div>
        <div className="text-blue-200/80 text-sm">Save surplus food in Albania</div>
      </header>

      <main className="relative z-10 container mx-auto px-6 pb-20">
        <section className="py-10">
          <Hero onSearch={setFilters} />
        </section>

        <section className="py-4">
          <h2 className="text-white font-semibold mb-4">Available near you</h2>
          <OfferList filters={filters} />
        </section>

        <section className="py-10">
          <VendorForm onCreated={() => setFilters({ ...filters })} />
        </section>
      </main>

      <footer className="relative z-10 text-center text-blue-300/60 pb-8">© {new Date().getFullYear()} MbaroMirë</footer>
    </div>
  )
}

export default App
