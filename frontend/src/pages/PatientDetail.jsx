import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import PatientForm from '../components/PatientForm'
import { deletePatient, getPatient } from '../services/patientService'

// One labelled field in the details grid.
function DetailItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-800">{value || '—'}</dd>
    </div>
  )
}

function initials(patient) {
  return `${patient.firstName?.[0] || ''}${patient.lastName?.[0] || ''}`.toUpperCase()
}

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setPatient(await getPatient(id))
    } catch (err) {
      setError(
        err.response?.status === 404
          ? 'Patient not found.'
          : 'Could not load this patient. Is the backend running?',
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async () => {
    if (!window.confirm(`Delete patient ${patient.firstName} ${patient.lastName}?`)) return
    try {
      await deletePatient(patient.id)
      navigate('/')
    } catch (err) {
      setError('Could not delete the patient. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-slate-400 shadow-sm">Loading…</div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
        <Link to="/" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Link to="/" className="inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to dashboard
      </Link>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Header band */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
              {initials(patient)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {patient.firstName} {patient.lastName}
              </h2>
              <div className="mt-1">
                <StatusBadge status={patient.appointmentStatus} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Details */}
        <dl className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Patient ID" value={patient.id} />
          <DetailItem label="Age" value={patient.age} />
          <DetailItem label="Email" value={patient.email} />
          <DetailItem label="Phone" value={patient.phone} />
          <DetailItem label="Condition" value={patient.condition} />
          <DetailItem label="Appointment Date" value={patient.appointmentDate} />
          <DetailItem label="Appointment Status" value={patient.appointmentStatus} />
        </dl>
      </div>

      {editing && (
        <PatientForm
          patient={patient}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            load()
          }}
        />
      )}
    </div>
  )
}
