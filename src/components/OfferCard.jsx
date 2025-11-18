export default function OfferCard({ offer, onReserve }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/10 rounded-2xl p-4 flex flex-col">
      <img src={offer.image_url || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop'} alt="offer" className="h-40 w-full object-cover rounded-xl mb-3" />
      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg">{offer.title}</h3>
        <p className="text-blue-200/70 text-sm">{offer.vendor_name} • {offer.city}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {offer.tags?.slice(0,3).map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200/80">{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-white font-bold">Lek {offer.price.toFixed(0)}</div>
          <div className="text-blue-300/60 line-through text-sm">Lek {offer.original_price.toFixed(0)}</div>
        </div>
        <button onClick={() => onReserve(offer)} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold">Reserve</button>
      </div>
    </div>
  )
}
