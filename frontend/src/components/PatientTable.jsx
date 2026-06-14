// Patient list table with colored appointment-status badges.

const STATUS_STYLES = {
  Scheduled: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  )
}

export default function PatientTable({ patients, onEdit, onDelete }) {
  const showActions = Boolean(onEdit || onDelete)

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {['Name', 'Age', 'Condition', 'Appointment Date', 'Status'].map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {col}
              </th>
            ))}
            {showActions && (
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 6 : 5}
                className="px-4 py-10 text-center text-slate-400"
              >
                No patients yet.
              </td>
            </tr>
          ) : (
            patients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">
                  {p.firstName} {p.lastName}
                </td>
                <td className="px-4 py-3 text-slate-600">{p.age ?? '—'}</td>
                <td className="px-4 py-3 text-slate-600">{p.condition || '—'}</td>
                <td className="px-4 py-3 text-slate-600">{p.appointmentDate || '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.appointmentStatus} />
                </td>
                {showActions && (
                  <td className="px-4 py-3 text-right">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(p)}
                        className="mr-3 text-sm font-medium text-brand-600 hover:text-brand-700"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(p)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
