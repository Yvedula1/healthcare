import { Link, Outlet } from 'react-router-dom'

// App shell: shared header + routed page content.
export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="bg-brand-700 text-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <Link to="/" className="inline-block">
            <h1 className="text-xl font-bold">CareTrack Healthcare Portal</h1>
            <p className="text-sm text-brand-100">Patient management &amp; appointment tracking</p>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
