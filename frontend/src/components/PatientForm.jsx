import { useState } from 'react'
import { createPatient, updatePatient } from '../services/patientService'

const STATUS_OPTIONS = ['Scheduled', 'Completed', 'Cancelled']

const EMPTY = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  phone: '',
  condition: '',
  appointmentDate: '',
  appointmentStatus: 'Scheduled',
}

// Build the initial form state from an existing patient (edit) or blanks (create).
function toFormState(patient) {
  if (!patient) return { ...EMPTY }
  return {
    firstName: patient.firstName ?? '',
    lastName: patient.lastName ?? '',
    age: patient.age ?? '',
    email: patient.email ?? '',
    phone: patient.phone ?? '',
    condition: patient.condition ?? '',
    appointmentDate: patient.appointmentDate ?? '',
    appointmentStatus: patient.appointmentStatus ?? 'Scheduled',
  }
}

export default function PatientForm({ patient, onClose, onSaved }) {
  const isEdit = Boolean(patient)
  const [form, setForm] = useState(() => toFormState(patient))
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFieldErrors({})
    setGeneralError('')

    // Build payload; send optional empties as null, age as a number.
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age === '' ? null : Number(form.age),
      email: form.email,
      phone: form.phone || null,
      condition: form.condition || null,
      appointmentDate: form.appointmentDate || null,
      appointmentStatus: form.appointmentStatus,
    }

    try {
      if (isEdit) {
        await updatePatient(patient.id, payload)
      } else {
        await createPatient(payload)
      }
      onSaved()
    } catch (err) {
      const data = err.response?.data
      if (data?.fieldErrors) {
        setFieldErrors(data.fieldErrors)
      }
      if (data?.message && !data.fieldErrors) {
        setGeneralError(data.message)
      } else if (!data) {
        setGeneralError('Could not reach the server. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  const field = (name, label, opts = {}) => (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        type={opts.type || 'text'}
        value={form[name]}
        onChange={handleChange}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 ${
          fieldErrors[name] ? 'border-red-400' : 'border-slate-300'
        }`}
      />
      {fieldErrors[name] && (
        <p className="mt-1 text-xs text-red-600">{fieldErrors[name]}</p>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {isEdit ? 'Edit Patient' : 'Add New Patient'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          {generalError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {generalError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {field('firstName', 'First Name')}
            {field('lastName', 'Last Name')}
            {field('age', 'Age', { type: 'number' })}
            {field('email', 'Email', { type: 'email' })}
            {field('phone', 'Phone')}
            {field('condition', 'Condition')}
            {field('appointmentDate', 'Appointment Date', { type: 'date' })}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Appointment Status
              </label>
              <select
                name="appointmentStatus"
                value={form.appointmentStatus}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {fieldErrors.appointmentStatus && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.appointmentStatus}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {saving ? 'Saving…' : isEdit ? 'Update Patient' : 'Create Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
