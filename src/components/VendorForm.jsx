import { useState } from 'react'

export default function VendorForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '', vendor_name: '', city: 'Tirana', address: '', cuisine: '',
    original_price: '', price: '', quantity: 1, pickup_start: '', pickup_end: '',
    tags: '', image_url: '', description: '',
  })
  const [code, setCode] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const base = import.meta.env.VITE_BACKEND_URL

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        original_price: parseFloat(form.original_price),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        tags: form.tags ? form.tags.split(',').map(s=>s.trim()).filter(Boolean) : [],
      }
      const res = await fetch(`${base}/api/offers?admin_code=${encodeURIComponent(code)}` ,{
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      onCreated?.(data.id)
      alert('Offer created!')
      setForm({title:'', vendor_name:'', city:'Tirana', address:'', cuisine:'', original_price:'', price:'', quantity:1, pickup_start:'', pickup_end:'', tags:'', image_url:'', description:''})
    } catch (e) {
      alert('Error creating offer. Check fields and admin code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Vendor: Create Offer</h3>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input className="input" placeholder="Vendor Name" value={form.vendor_name} onChange={e=>setForm({...form, vendor_name:e.target.value})} required />
        <input className="input" placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} required />
        <input className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <input className="input" placeholder="Cuisine" value={form.cuisine} onChange={e=>setForm({...form, cuisine:e.target.value})} />
        <input className="input" type="number" step="0.01" placeholder="Original Price (Lek)" value={form.original_price} onChange={e=>setForm({...form, original_price:e.target.value})} required />
        <input className="input" type="number" step="0.01" placeholder="Discounted Price (Lek)" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input className="input" type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} required />
        <input className="input" type="datetime-local" placeholder="Pickup Start" value={form.pickup_start} onChange={e=>setForm({...form, pickup_start:e.target.value})} required />
        <input className="input" type="datetime-local" placeholder="Pickup End" value={form.pickup_end} onChange={e=>setForm({...form, pickup_end:e.target.value})} required />
        <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
        <input className="input md:col-span-2" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} />
        <textarea className="input md:col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <input className="input" placeholder="Admin Code" value={code} onChange={e=>setCode(e.target.value)} />
          <button disabled={loading} className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold disabled:opacity-50">{loading ? 'Creating...' : 'Create Offer'}</button>
        </div>
      </form>
      <style>{`.input{padding:.75rem 1rem;border-radius:.75rem;background:rgba(15,23,42,.7);color:white;border:1px solid rgba(59,130,246,.2)}`}</style>
    </div>
  )
}
