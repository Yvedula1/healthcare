import { useCallback, useEffect, useState } from 'react'
import DashboardCards from '../components/DashboardCards'
import PatientTable from '../components/PatientTable'
import { getDashboardSummary, getPatients } from '../services/patientService'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
          <h2 className="text-lg font-semibold text-slate-700">Patients</h2>
          {loading ? (
            <div className="rounded-xl bg-white p-10 text-center text-slate-400 shadow-sm">
              Loading…
            </div>
          ) : (
            <PatientTable patients={patients} />
          )}
        </section>
      </main>
    </div>
  )
}
