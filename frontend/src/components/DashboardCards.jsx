// Four summary cards driven by the /api/dashboard response.

const CARDS = [
  { key: 'totalPatients', label: 'Total Patients', accent: 'border-brand-500', text: 'text-brand-700' },
  { key: 'scheduled', label: 'Scheduled Appointments', accent: 'border-blue-500', text: 'text-blue-700' },
  { key: 'completed', label: 'Completed Visits', accent: 'border-green-500', text: 'text-green-700' },
  { key: 'cancelled', label: 'Cancelled Visits', accent: 'border-red-500', text: 'text-red-700' },
]

export default function DashboardCards({ summary }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className={`rounded-xl border-l-4 bg-white p-5 shadow-sm ${card.accent}`}
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className={`mt-2 text-3xl font-bold ${card.text}`}>
            {summary ? summary[card.key] : '—'}
          </p>
        </div>
      ))}
    </div>
  )
}
