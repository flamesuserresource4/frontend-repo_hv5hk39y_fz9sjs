import { useEffect, useState } from 'react'
import OfferCard from './OfferCard'

export default function OfferList({ filters }) {
  const [offers, setOffers] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL

  const fetchOffers = async () => {
    const params = new URLSearchParams()
    if (filters?.city) params.set('city', filters.city)
    if (filters?.q) params.set('q', filters.q)
    const res = await fetch(`${base}/api/offers?` + params.toString())
    const data = await res.json()
    setOffers(data)
  }

  useEffect(() => {
    fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.city, filters?.q])

  const reserve = async (offer) => {
    const name = prompt('Your name')
    if (!name) return
    const phone = prompt('Phone number')
    if (!phone) return
    const res = await fetch(`${base}/api/reservations`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ offer_id: offer.id, customer_name: name, customer_phone: phone, quantity: 1 }) })
    if (res.ok) {
      alert('Reserved! You can pick up during the window.');
      fetchOffers()
    } else {
      alert('Could not reserve. Maybe sold out?')
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {offers.map(o => <OfferCard key={o.id} offer={o} onReserve={reserve} />)}
      {offers.length === 0 && (
        <div className="text-blue-200/80">No offers found. Try changing filters.</div>
      )}
    </div>
  )
}
