import { useEffect, useState } from 'react'

export default function Hero({ onSearch }) {
  const [cities, setCities] = useState(["Tirana"]) 
  const [city, setCity] = useState("Tirana")
  const [q, setQ] = useState("")

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL
    fetch(`${base}/api/cities`).then(r => r.json()).then(d => {
      if (Array.isArray(d.cities)) setCities(d.cities)
    }).catch(() => {})
  }, [])

  const submit = (e) => {
    e.preventDefault()
    onSearch({ city, q })
  }

  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">Save surplus food in Albania</h1>
      <p className="text-blue-200/80">Discover discounted surprise bags from local restaurants and bakeries</p>

      <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 items-center justify-center">
        <select value={city} onChange={e=>setCity(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-800/70 text-white border border-blue-500/20">
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by vendor or tag" className="px-4 py-3 rounded-xl bg-slate-800/70 text-white border border-blue-500/20 w-64" />
        <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">Search</button>
      </form>
    </div>
  )
}
