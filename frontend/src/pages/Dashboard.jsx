import { useCallback, useEffect, useState } from 'react'
import DashboardCards from '../components/DashboardCards'
import PatientTable from '../components/PatientTable'
import PatientForm from '../components/PatientForm'
import { deletePatient, getDashboardSummary, getPatients } from '../services/patientService'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Form state: closed when null; otherwise holds the patient being edited
  // (or a sentinel for "create").
  const [formOpen, setFormOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [summaryData, patientData] = await Promise.all([
        getDashboardSummary(),
        getPatients(),
      ])
      setSummary(summaryData)
      setPatients(patientData)
    } catch (err) {
      setError('Could not load data. Is the backend running on http://localhost:8080?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openCreate = () => {
    setEditingPatient(null)
    setFormOpen(true)
  }

  const openEdit = (patient) => {
    setEditingPatient(patient)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingPatient(null)
  }

  const handleSaved = async () => {
    closeForm()
    await loadData()
  }

  const handleDelete = async (patient) => {
    const ok = window.confirm(
      `Delete patient ${patient.firstName} ${patient.lastName}?`,
    )
    if (!ok) return
    try {
      await deletePatient(patient.id)
      await loadData()
    } catch (err) {
      setError('Could not delete the patient. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-brand-700 text-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-bold">CareTrack Healthcare Portal</h1>
          <p className="text-sm text-brand-100">Patient management &amp; appointment tracking</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <DashboardCards summary={summary} />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-700">Patients</h2>
            <button
              onClick={openCreate}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
            >
              + Add New Patient
            </button>
          </div>

          {loading ? (
            <div className="rounded-xl bg-white p-10 text-center text-slate-400 shadow-sm">
              Loading…
            </div>
          ) : (
            <PatientTable patients={patients} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </section>
      </main>

      {formOpen && (
        <PatientForm patient={editingPatient} onClose={closeForm} onSaved={handleSaved} />
      )}
    </div>
  )
}
